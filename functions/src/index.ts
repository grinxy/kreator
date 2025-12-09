/* eslint-disable @typescript-eslint/no-explicit-any */
import {onCall, HttpsError, onRequest} from "firebase-functions/v2/https";
import {
  onDocumentCreated,
  onDocumentWritten,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import {initializeApp} from "firebase-admin/app";
import {getFirestore, FieldValue} from "firebase-admin/firestore";
import {logger} from "firebase-functions";
import Stripe from "stripe";


initializeApp();
const db = getFirestore();


const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;


const getStripe = (): Stripe => {
  const stripeSecret = process.env.STRIPE_SECRET;
  if (!stripeSecret) {
    throw new Error("Missing STRIPE_SECRET");
  }


  return new Stripe(stripeSecret);
};


/**
 * 1. Create customer + SetupIntent
 */
export const createSetupIntent = onCall(
  {
    cors: true,
  },
  async (request) => {
    const {userId, name, email} = request.data;


    if (!email) {
      throw new HttpsError("invalid-argument", "Email is required");
    }


    try {
      const stripe = getStripe();


      logger.info(`Creating Stripe customer for user ${userId}`);


      // 1. Check whether the customer already exists
      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1,
      });


      let customer;


      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        logger.info(`Using existing Stripe customer: ${customer.id}`);
      } else {
        // 2. Create new customer
        customer = await stripe.customers.create({
          name,
          email,
          preferred_locales: ["es"],
          metadata: {
            firebaseUserId: userId,
          },
        });
        logger.info(`Created new Stripe customer: ${customer.id}`);
      }


      // 3. Create SetupIntent
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
        usage: "off_session",
        metadata: {
          firebaseUserId: userId,
        },
      });


      logger.info(`Created SetupIntent ${setupIntent.id} for user ${userId}`);


      // 4. Save the customerId in Firestore IMMEDIATELY
      await db.collection("users").doc(userId).update({
        stripe_customer_id: customer.id,
        setup_intent_id: setupIntent.id,
      });


      // La sincronización con Airtable/Stripe la hacen los triggers
      return {
        setupIntentId: setupIntent.id,
        clientSecret: setupIntent.client_secret,
        customerId: customer.id,
      };
    } catch (error) {
      logger.error("Error creating setup intent:", error);


      if (error instanceof Stripe.errors.StripeError) {
        throw new HttpsError("internal", `Stripe error: ${error.message}`);
      }


      throw new HttpsError("internal", "Failed to create setup intent");
    }
  }
);


/**
 * 2. Save payment method after confirming SetupIntent
 * The customer sends setupIntentId (not paymentMethodId)
 * We retrieve the paymentMethodId from Stripe
 */
export const savePaymentMethod = onCall(
  {
    cors: true,
  },
  async (request) => {
    const {userId, setupIntentId} = request.data;


    if (!setupIntentId) {
      throw new HttpsError("invalid-argument", "setupIntentId is required");
    }


    try {
      const stripe = getStripe();


      // Retrieve the SetupIntent to obtain the paymentMethodId
      const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);


      if (setupIntent.status !== "succeeded") {
        throw new Error(
          `SetupIntent status is ${setupIntent.status}, expected succeeded`
        );
      }


      const paymentMethodId = setupIntent.payment_method as string;
      const customerId = setupIntent.customer as string;


      if (!paymentMethodId || !customerId) {
        throw new Error(
          "Missing paymentMethodId or customerId from SetupIntent");
      }


      // UPDATE WITH STEP 2 STATUSES
      //  ADD: Attachar payment method como default


      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });


      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });


      logger.info(`✅ Payment method ${paymentMethodId} 
        attached as default to customer ${customerId}`);


      // UPDATE WITH STEP 2 STATUSES
      await db.collection("users").doc(userId).update({
        payment_method_id: paymentMethodId,
        stripe_customer_id: customerId,
        setup_intent_id: setupIntentId,
        payment_method_saved_at: FieldValue.serverTimestamp(),


        // Step 2 Status
        registration_status: "payment_method_completed",
        registration_step: 2,
        step_2_completed_at: FieldValue.serverTimestamp(),
        last_activity_at: FieldValue.serverTimestamp(),
      });


      logger.info(`Payment method ${paymentMethodId} saved for user ${userId}`);


      return {
        success: true,
        paymentMethodId,
        customerId,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Error saving payment method for ${userId}:`, message);


      throw new HttpsError("internal", message);
    }
  }
);


/**
 * TEMPORARY: Complete payment_method_id for users with setup_intent
 */
export const fixMissingPaymentMethods = onCall(
  {
    cors: true,
  },
  async (request) => {
    const {userId} = request.data;


    if (!userId) {
      throw new HttpsError("invalid-argument", "userId is required");
    }


    try {
      const stripe = getStripe();


      // Obtain user data
      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();


      if (!userData) {
        throw new Error("User not found");
      }


      const setupIntentId = userData.setup_intent_id;


      if (!setupIntentId) {
        throw new Error("No setup_intent_id found for this user");
      }


      logger.info(
        `🔧 Fixing payment method for user ${userId} 
        with setup_intent ${setupIntentId}`
      );


      // Retrieve the SetupIntent
      const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);


      if (setupIntent.status !== "succeeded") {
        throw new Error(
          `SetupIntent status is ${setupIntent.status}, expected succeeded`
        );
      }


      const paymentMethodId = setupIntent.payment_method as string;
      const customerId = setupIntent.customer as string;


      if (!paymentMethodId) {
        throw new Error("No payment method found in SetupIntent");
      }


      // Update Firestore
      await db.collection("users").doc(userId).update({
        payment_method_id: paymentMethodId,
        stripe_customer_id: customerId,
        payment_method_saved_at: FieldValue.serverTimestamp(),
        registration_status: "payment_method_completed",
        registration_step: 2,
        step_2_completed_at: FieldValue.serverTimestamp(),
        last_activity_at: FieldValue.serverTimestamp(),
      });


      logger.info(`✅ Payment method ${paymentMethodId} 
        saved for user ${userId}`);


      return {
        success: true,
        paymentMethodId,
        customerId,
        message: "Payment method fixed successfully",
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Error fixing payment method for ${userId}:`, message);
      throw new HttpsError("internal", message);
    }
  }
);


/**
 * 3. Firestore trigger (on status change → approved)
 */
export const onUserStatusChange = onDocumentUpdated(
  "users/{userId}",
  async (event) => {
    const beforeData = event.data?.before.data();
    const afterData = event.data?.after.data();
    const userId = event.params.userId;


    // ⬇️ AÑADIR ESTOS LOGS:
    logger.info(`🔍 onUserStatusChange triggered for ${userId}`);
    logger.info(`📊 Before status: "${beforeData?.status}", 
      After status: "${afterData?.status}"`);
    const statusChanged = beforeData?.status !== afterData?.status;
    const isApproved = afterData?.status === "approved";


    if (!statusChanged || !isApproved) return;


    try {
      const stripe = getStripe();
      const stripeCustomerId = afterData?.stripe_customer_id;
      const paymentMethodId = afterData?.payment_method_id;


      const initialAmount = Number(process.env.STRIPE_PRICE_FIRST_PAYMENT);
      const subscriptionPrice = process.env.STRIPE_PRICE_SUBSCRIPTION;


      if (!stripeCustomerId) {
        throw new Error(`Missing Stripe customer for ${userId}`);
      }


      if (!initialAmount || !subscriptionPrice) {
        throw new Error("Missing Price IDs or initial amount");
      }


      if (!paymentMethodId) {
        throw new Error(`Missing payment method for ${userId}`);
      }


      // 2) Crear factura legal para el primer pago
      logger.info("📄 Creating legal invoice for initial payment...");


      try {
        // First: create a draft invoice (empty)
        const invoice = await stripe.invoices.create({
          customer: stripeCustomerId,
          auto_advance: false,
          collection_method: "charge_automatically",
          description: "Factura de activación del servicio",
          metadata: {
            userId,
            type: "initial_payment",
          },
        });


        logger.info(`📋 Draft invoice ${invoice.id} created`);


        // Second: add item to invoice
        await stripe.invoiceItems.create({
          customer: stripeCustomerId,
          invoice: invoice.id, // ← IMPORTANT: associate with the invoice
          amount: 9680, // 80€ total
          currency: "eur",
          description: "Reserva Plaza Kreator (Base: 80.00€ + IVA 21%: 16.8€)",
          metadata: {
            userId,
            type: "initial_payment",
            base_amount: "6612",
            tax_amount: "1388",
            tax_rate: "21",
          },
        });


        logger.info("💰 Invoice item added: 80€");

        // Finalise invoice (generates the invoice number)
        const finalizedInvoice =
          await stripe.invoices.finalizeInvoice(invoice.id);


        logger.info(`✅ Invoice ${finalizedInvoice.number} finalized`);


        // Pay the bill using the saved payment method
        const paidInvoice = await stripe.invoices.pay(finalizedInvoice.id, {
          payment_method: paymentMethodId,
        });


        logger.info(`💳 Invoice ${paidInvoice.number} paid successfully`);


        // Enviar factura por email
        await stripe.invoices.sendInvoice(paidInvoice.id);


        logger.info(`📧 Invoice 
          ${paidInvoice.number} sent to ${afterData?.email}`);


        // Save to Firestore
        await db.collection("users").doc(userId).update({
          initial_invoice_id: paidInvoice.id,
          initial_invoice_number: paidInvoice.number,
          initial_invoice_pdf: paidInvoice.invoice_pdf,
          initial_invoice_url: paidInvoice.hosted_invoice_url,
          initial_invoice_sent_at: FieldValue.serverTimestamp(),
        });


        logger.info("💾 Invoice info saved to Firestore");
      } catch (invoiceError) {
        logger.error("❌ Error creating invoice:", invoiceError);
        // Do not fail the entire process if the invoice fails.
        // The payment has been successfully completed.
      }


      // 2) Create monthly subscription
      /* const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{price: subscriptionPrice}],
        expand: ["latest_invoice.payment_intent"],
      });


      await db.collection("users").doc(userId).update({
        subscription_id: subscription.id,
        subscription_status: subscription.status,
        payment_status: "completed",
        approved_at: FieldValue.serverTimestamp(),
      });


      logger.info(`Subscription ${subscription.id} created for user ${userId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Error processing user ${userId}:`, message);
*/
      // Mark as completed
      await db.collection("users").doc(userId).update({
        payment_status: "completed",
        approved_at: FieldValue.serverTimestamp(),
      });


      logger.info(`✅ Initial payment and invoice completed for user ${userId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Error processing user ${userId}:`, message);


      await db.collection("users").doc(userId).update({
        payment_status: "error",
        payment_error: message,
        errorAt: FieldValue.serverTimestamp(),
      });
    }
  }
);


/**
 * 4. Receive updates from Airtable
 * and update the 'status' field in Firestore
 */
export const airtableUpdateUser = onRequest(
  {
    region: "europe-west1",
    cors: true,
  },
  async (...args) => {
    const [req, res] = args as unknown as [any, any];


    try {
      if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
      }


      const {userId, status} = req.body;


      if (!userId || !status) {
        return res.status(400).json({error: "Missing userId or status"});
      }


      const normalizeStatus = (
        value: string
      ): "pending" | "approved" | "rejected" => {
        const v = value.toLowerCase().trim();

        if (v === "pendiente") return "pending";
        if (v === "activa" || v === "activo") return "approved";
        if (v === "rechazado" || v === "rechazada") return "rejected";

        return "pending";
      };

      const normalized = normalizeStatus(status);

      logger.info(
        `🔄 Actualizando Firestore desde Airtable → 
        userId: ${userId}, status: ${normalized}`
      );


      await db.collection("users").doc(userId).update({
        status: normalized,
        updated_at: FieldValue.serverTimestamp(),
        updatedFromAirtable: true,
      });

      return res.json({
        success: true,
        userId,
        finalStatus: normalized,
      });
    } catch (err) {
      logger.error("Error updating Firestore from Airtable:", err);
      return res.status(500).json({error: "Internal server error"});
    }
  }
);

/**
 * 5. Webhook for handling Stripe events (v2)
 */
export const stripeWebhook = onRequest(
  {
    region: "europe-west1",
    cors: false,
  },
  async (...args) => {
    const [req, res] = args as unknown as [any, any];

    logger.info("📩 Webhook received.");

    if (!webhookSecret) {
      return res.status(500).send("Missing STRIPE_WEBHOOK_SECRET");
    }

    const stripe = getStripe();
    const signature = req.header("stripe-signature") ?? "";
    const rawBody = (req as any).rawBody as Buffer;

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      logger.info("🔔 Event:", event.type);
    } catch (err) {
      logger.error("❌ Signature verification failed:", err);
      return res.status(400).send("Invalid signature");
    }

    switch (event.type) {
    case "payment_intent.succeeded":
      logger.info("💳 Payment OK");
      break;

    case "customer.subscription.deleted":
      logger.info("❌ Subscription canceled");
      break;

    default:
      logger.info(`ℹ️ Unhandled: ${event.type}`);
    }

    return res.status(200).json({received: true});
  }
);

/**
 * 6. Sync customer data from Airtable to Stripe
 */
export const syncCustomerToStripe = onRequest(
  {
    region: "europe-west1",
    cors: true,
  },
  async (...args) => {
    const [req, res] = args as unknown as [any, any];

    try {
      if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
      }

      const {
        userId, name, taxId, address, city, postalCode, province, country} =
        req.body;

      if (!userId) {
        return res.status(400).json({error: "Missing userId"});
      }

      logger.info(`🔄 Syncing customer data to Stripe for user ${userId}`, {
        name,
        taxId,
        address,
        city,
        postalCode,
        province,
        country,
      });

      const userDoc = await db.collection("users").doc(userId).get();

      if (!userDoc.exists) {
        logger.error(`User ${userId} not found in Firestore`);
        return res.status(404).json({error: "User not found"});
      }

      const userData = userDoc.data();
      const stripeCustomerId = userData?.stripe_customer_id;

      if (!stripeCustomerId) {
        logger.error(`User ${userId} doesn't have stripe_customer_id`);
        return res.status(400).json({
          error: "User doesn't have a Stripe customer ID yet",
        });
      }

      const stripe = getStripe();
      const updateData: any = {
        metadata: {
          firebaseUserId: userId,
          syncedFromAirtable: new Date().toISOString(),
        },
      };

      if (name) {
        updateData.name = name;
      }

      if (address || city || postalCode || province || country) {
        updateData.address = {
          line1: address || "",
          city: city || "",
          postal_code: postalCode || "",
          state: province || "",
          country: country || "ES",
        };
      }

      if (taxId) {
        const cleanTaxId = taxId.toUpperCase().trim();
        const isCIF = /^[ABCDEFGHJNPQRSUVW]/.test(cleanTaxId);

        if (!updateData.metadata) {
          updateData.metadata = {};
        }

        updateData.metadata.taxId = cleanTaxId;
        updateData.metadata.taxIdType = isCIF ? "CIF" : "NIF";
      }

      logger.info(`Updating Stripe customer 
        ${stripeCustomerId} with data:`, updateData);

      await stripe.customers.update(stripeCustomerId, updateData);

      logger.info(`✅ Stripe customer ${stripeCustomerId} updated successfully`);

      if (taxId) {
        const cleanTaxId = taxId.toUpperCase().trim();

        await stripe.customers.createTaxId(stripeCustomerId, {
          type: "es_cif",
          value: cleanTaxId,
        });

        logger.info(
          `✅ Tax ID es_cif (${cleanTaxId}) 
          añadido al customer ${stripeCustomerId}`
        );
      }

      const firestoreUpdate: any = {
        customer_synced_at: FieldValue.serverTimestamp(),
      };

      if (name) firestoreUpdate.name = name;
      if (taxId) firestoreUpdate.taxId = taxId;
      if (address) firestoreUpdate.address = address;
      if (city) firestoreUpdate.city = city;
      if (postalCode) firestoreUpdate.postalCode = postalCode;
      if (province) firestoreUpdate.province = province;
      if (country) firestoreUpdate.country = country;

      await db.collection("users").doc(userId).update(firestoreUpdate);

      return res.json({
        success: true,
        customerId: stripeCustomerId,
        updatedFields: Object.keys(updateData),
        message: "Customer data synced to Stripe successfully",
      });
    } catch (err) {
      logger.error("❌ Error syncing customer to Stripe:", err);

      return res.status(500).json({
        error: "Internal server error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }
);

/**
 * Helper Airtable request
 */
async function airtableRequest(
  method: string,
  endpoint: string,
  body?: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw new Error("Missing Airtable credentials");
  }

  const url = `https://api.airtable.com/v0/${baseId}/${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Airtable API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Find existing Airtable record by Firestore User ID
 */
async function findAirtableRecord(
  tableName: string,
  userId: string
): Promise<string | null> {
  try {
    const formula = encodeURIComponent(`{Firestore User ID} = '${userId}'`);
    const response = await airtableRequest(
      "GET",
      `${tableName}?filterByFormula=${formula}&maxRecords=1`
    );

    const records =
      (response as { records?: Array<{ id: string }> }).records ?? [];

    if (records.length > 0) {
      return records[0].id;
    }
    return null;
  } catch (err) {
    logger.error("Error finding Airtable record:", err);
    return null;
  }
}

/**
 * Sync user billing info to Stripe (from Firestore userData)
 */
async function syncBillingToStripe(
  userId: string,
  userData: Record<string, unknown>
): Promise<void> {
  const stripe = getStripe();
  const stripeCustomerId = userData.stripe_customer_id as string | undefined;

  if (!stripeCustomerId) {
    logger.warn(`User ${userId} doesn't have stripe_customer_id yet`);
    return;
  }

  try {
    const updateData: Stripe.CustomerUpdateParams = {
      preferred_locales: ["es"],
      metadata: {
        firebaseUserId: userId,
      },
    };

    if (userData.name || userData.nombre) {
      updateData.name = (userData.name || userData.nombre) as string;
    }

    if (userData.email) {
      updateData.email = userData.email as string;
    }

    if (userData.phone || userData.telefono) {
      updateData.phone = (userData.phone || userData.telefono) as string;
    }

    const address =
      userData.address || userData.street_address || userData.direccion;
    const city = userData.city || userData.ciudad;
    const postalCode =
      userData.postalCode ||
      userData.postal_code ||
      userData.codigo_postal;
    const province =
      userData.province || userData.provincia || userData.state;
    const country = userData.country || userData.pais || "ES";

    if (address || city || postalCode || province) {
      updateData.address = {
        line1: (address as string) || "",
        city: (city as string) || "",
        postal_code: (postalCode as string) || "",
        state: (province as string) || "",
        country: country as string,
      };
    }

    const taxId = userData.taxId || userData.nif_cif || userData.tax_id;
    if (taxId) {
      const cleanTaxId = (taxId as string).toUpperCase().trim();

      if (!updateData.metadata) {
        updateData.metadata = {};
      }
      updateData.metadata.taxId = cleanTaxId;

      const isCIF = /^[ABCDEFGHJNPQRSUVW]/.test(cleanTaxId);
      (updateData.metadata as any).taxIdType = isCIF ? "CIF" : "NIF";
    }

    logger.info(
      `📤 Updating Stripe customer ${stripeCustomerId} with billing data`
    );

    await stripe.customers.update(stripeCustomerId, updateData);

    logger.info(`✅ Stripe customer ${stripeCustomerId} updated successfully`);

    if (taxId) {
      try {
        const cleanTaxId = (taxId as string).toUpperCase().trim();
        const existingTaxIds =
          await stripe.customers.listTaxIds(stripeCustomerId);
        const alreadyExists = existingTaxIds.data.some(
          (tid) => tid.value === cleanTaxId
        );

        if (!alreadyExists) {
          await stripe.customers.createTaxId(stripeCustomerId, {
            type: "es_cif",
            value: cleanTaxId,
          });
          logger.info(
            `✅ Tax ID (${cleanTaxId}) added to Stripe customer 
            ${stripeCustomerId}`
          );
        } else {
          logger.info(
            `ℹ️ Tax ID already exists for customer ${stripeCustomerId}`
          );
        }
      } catch (taxIdError) {
        logger.error("Error adding Tax ID to Stripe:", taxIdError);
      }
    }

    await db.collection("users").doc(userId).update({
      stripe_billing_synced_at: FieldValue.serverTimestamp(),
      stripe_billing_sync_success: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error(`Error syncing billing to Stripe for ${userId}:`, message);

    await db.collection("users").doc(userId).update({
      stripe_billing_sync_error: message,
      stripe_billing_sync_error_at: FieldValue.serverTimestamp(),
      stripe_billing_sync_success: false,
    });

    throw err;
  }
}

/**
 * Buscar el recordId de una Zona en la tabla "Zones"
 * usando el nombre exacto de la zona
 */
async function findZoneRecordId(zoneName: string): Promise<string | null> {
  try {
    const formula = encodeURIComponent(`{Zona} = '${zoneName}'`);

    const response = await airtableRequest(
      "GET",
      `Zones?filterByFormula=${formula}&maxRecords=1`
    );

    const records =
      (response as { records?: Array<{ id: string }> }).records ?? [];

    if (records.length === 0) {
      logger.warn(
        `⚠️ Zona '${zoneName}' no encontrada en Airtable (tabla Zones)`
      );
      return null;
    }

    return records[0].id;
  } catch (err) {
    logger.error("❌ Error buscando Zona en Airtable:", err);
    return null;
  }
}

/**
 * Sync user to Airtable (Users table)
 */
async function syncToAirtable(
  userId: string,
  userData: Record<string, unknown>
): Promise<void> {
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Users";

  const fields: Record<string, unknown> = {
    // "ID": userData.registration_order || "",
    "Firestore User ID": userData.firebaseUserId || userId,
    "Nombre": userData.name || userData.nombre || "",
    "Email": userData.email || "",
    "Telefono": userData.phone || userData.telefono || "",
    "NIF/CIF": userData.taxId || userData.nif_cif || "",
    "Rol": userData.role || userData.rol || "",
    "Auth UID": userData.auth_uid || userData.firebaseUserId || userId,
    "Stripe Customer ID": userData.stripe_customer_id || "",
    "codigo postal": userData.postalCode || userData.postal_code ||
      userData.codigo_postal || "",
    "Ciudad": userData.city || userData.ciudad || "",
    "provincia_facturacion": userData.province || userData.provincia ||
    userData.state || "",
    "Pais": userData.country || userData.pais || "España",
    "Referrer ID": userData.referrer_id || userData.referred_by || "",
    "Aceptados Terminos":
      userData.terms_accepted || userData.aceptados_terminos || false,
    "Interesado en Jefe Equipo":
      userData.interested_in_leadership ||
      userData.interesado_jefe_equipo ||
      false,
  };
  // Creation date (YYYY-MM-DD format for Airtable)
  if (userData.created_at) {
    try {
      let date: Date | null = null;

      // It is a Firestore timestamp.
      if (userData.created_at && typeof userData.created_at === "object" &&
        "toDate" in userData.created_at) {
        date = (userData.created_at as any).toDate();
      } else if (typeof userData.created_at === "number") {
        date = new Date(userData.created_at);
      }


      if (date) {
      // YYYY-MM-DD format for Airtable
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        fields["Fecha creación"] = `${year}-${month}-${day}`;
      }
    } catch (err) {
      logger.warn("Could not convert created_at:", err);
    }
  }

  // Profesión
  if (userData.profession || userData.profesion) {
    const profession = userData.profession || userData.profesion;
    fields.Profesion = profession;

    if (profession === "Otros" || profession === "otros") {
      fields["Otros (Profesion)"] =
        userData.custom_profession ||
        userData.otros_profesion ||
        userData.customProfession ||
        "";
    }
  }

  // Zona (linked record)
  const rawZone = userData.zone || userData.zona;

  let zoneName: string | undefined;

  if (typeof rawZone === "string") {
    zoneName = rawZone;
  } else if (rawZone && typeof rawZone === "object") {
    const z = rawZone as any;

    zoneName =
    z.name ||
    z.nombre ||
    z.zona ||
    z.zoneName ||
    z.comarca ||
    z.region ||
    undefined;
  }

  if (zoneName) {
    const zoneRecordId = await findZoneRecordId(zoneName);
    if (zoneRecordId) {
      fields["Zona"] = [zoneRecordId];
    } else {
      logger.warn(`⚠️ Zona '${zoneName}' no encontrada en Airtable`);
    }
  }

  logger.info(`📤 Syncing user ${userId} to Airtable`, {
    fields: Object.keys(fields),
  });

  const existingRecordId = await findAirtableRecord(tableName, userId);

  if (existingRecordId) {
    await airtableRequest("PATCH", `${tableName}/${existingRecordId}`, {
      fields,
    });
    logger.info(
      `✅ Updated Airtable record ${existingRecordId} for user ${userId}`
    );
  } else {
    const response = await airtableRequest("POST", tableName, {
      fields,
    });
    const recordId = (response as any).id;
    logger.info(`✅ Created Airtable record ${recordId} for user ${userId}`);

    await db.collection("users").doc(userId).update({
      airtable_record_id: recordId,
      synced_to_airtable_at: FieldValue.serverTimestamp(),
    });
  }
}

/**
 * TRIGGER: Sync new user to Airtable AND Stripe on creation
 */
export const onNewUserCreated = onDocumentCreated(
  "users/{userId}",
  async (event) => {
    const userId = event.params.userId;
    const userData = event.data?.data();

    logger.info("🔍 DEBUG - env Airtable:", {
      hasAirtableKey: !!process.env.AIRTABLE_API_KEY,
      hasAirtableBase: !!process.env.AIRTABLE_BASE_ID,
      airtableKeyLength: process.env.AIRTABLE_API_KEY?.length || 0,
    });

    if (!userData) {
      logger.warn(`No data for user ${userId}`);
      return;
    }

    logger.info(
      `🆕 New user created: ${userId}. Starting sync to Airtable and Stripe...`
    );

    const results = {
      airtable: false,
      stripe: false,
      errors: [] as string[],
    };

    try {
      await syncToAirtable(userId, userData);
      results.airtable = true;
      logger.info(`✅ Airtable sync completed for user ${userId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`❌ Airtable sync failed for ${userId}:`, message);
      results.errors.push(`Airtable: ${message}`);
    }

    if (userData.stripe_customer_id) {
      try {
        await syncBillingToStripe(userId, userData);
        results.stripe = true;
        logger.info(`✅ Stripe billing sync completed for user ${userId}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        logger.error(`❌ Stripe billing sync failed for ${userId}:`, message);
        results.errors.push(`Stripe: ${message}`);
      }
    } else {
      logger.info(
        `ℹ️ User ${userId} 
        doesn't have stripe_customer_id yet, skipping Stripe sync`
      );
    }

    logger.info(`🏁 Sync completed for ${userId}:`, results);
  }
);

/**
 * TRIGGER: Sync user updates to Airtable and Stripe
 */
export const onUserDataUpdated = onDocumentWritten(
  "users/{userId}",
  async (event) => {
    const userId = event.params.userId;
    const beforeData = event.data?.before.data();
    const afterData = event.data?.after.data();

    if (!afterData) {
      logger.info(`User ${userId} was deleted, skipping sync`);
      return;
    }

    if (!beforeData) {
      logger.info(
        `Skipping onUserDataUpdated for new user 
        ${userId} (handled by onNewUserCreated)`
      );
      return;
    }

    logger.info(`📝 User updated: ${userId}. Checking what changed...`);

    const results = {
      airtable: false,
      stripe: false,
      changes: [] as string[],
      errors: [] as string[],
    };

    const fieldsToWatch = [
      "name",
      "nombre",
      "email",
      "phone",
      "telefono",
      "taxId",
      "nif_cif",
      "address",
      "street_address",
      "direccion",
      "city",
      "ciudad",
      "postalCode",
      "postal_code",
      "codigo_postal",
      "province",
      "provincia",
      "state",
      "profession",
      "profesion",
      "custom_profession",
      "stripe_customer_id",
      "status",
      "registration_step",
      "registration_status",
      "zone",
      "zona",
    ];

    const changedFields = fieldsToWatch.filter(
      (field) => beforeData[field] !== afterData[field]
    );

    if (changedFields.length === 0) {
      logger.info(
        `No relevant changes detected for user ${userId}, skipping sync`
      );
      return;
    }

    results.changes = changedFields;
    logger.info(`📊 Changed fields for ${userId}:`, changedFields);

    try {
      await syncToAirtable(userId, afterData);
      results.airtable = true;
      logger.info(`✅ Airtable sync completed for user ${userId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`❌ Airtable sync failed for ${userId}:`, message);
      results.errors.push(`Airtable: ${message}`);
    }

    const billingFields = [
      "name",
      "nombre",
      "email",
      "taxId",
      "nif_cif",
      "address",
      "street_address",
      "direccion",
      "city",
      "ciudad",
      "postalCode",
      "postal_code",
      "codigo_postal",
      "province",
      "provincia",
      "state",
    ];
    const billingChanged = changedFields.some((field) =>
      billingFields.includes(field)
    );

    const stripeCustomerJustAdded =
      changedFields.includes("stripe_customer_id") &&
      afterData.stripe_customer_id &&
      !beforeData.stripe_customer_id;

    if ((billingChanged || stripeCustomerJustAdded) &&
    afterData.stripe_customer_id) {
      try {
        await syncBillingToStripe(userId, afterData);
        results.stripe = true;
        logger.info(`✅ Stripe billing sync completed for user ${userId}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        logger.error(`❌ Stripe billing sync failed for ${userId}:`, message);
        results.errors.push(`Stripe: ${message}`);
      }
    }
    logger.info(`🏁 Update sync completed for ${userId}:`, results);
  }
);

/**
 * CALLABLE: Manual sync function for specific user
 */
export const manualSyncUser = onCall(
  {
    cors: true,
  },
  async (request) => {
    const {userId, syncAirtable = true, syncStripe = true} = request.data;
    if (!userId) {
      throw new HttpsError("invalid-argument", "userId is required");
    }
    try {
      logger.info(`🔄 Manual sync initiated for user ${userId}`);

      const userDoc = await db.collection("users").doc(userId).get();
      if (!userDoc.exists) {
        throw new HttpsError("not-found", "User not found");
      }

      const userData = userDoc.data();
      if (!userData) {
        throw new HttpsError("not-found", "User missing data");
      }

      const results = {
        airtable: false,
        stripe: false,
        errors: [] as string[],
      };

      if (syncAirtable) {
        try {
          await syncToAirtable(userId, userData);
          results.airtable = true;
          logger.info(`✅ Manual Airtable sync completed for ${userId}`);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          logger.error(
            `❌ Manual Airtable sync failed for ${userId}:`,
            message
          );
          results.errors.push(`Airtable: ${message}`);
        }
      }

      if (syncStripe && userData.stripe_customer_id) {
        try {
          await syncBillingToStripe(userId, userData);
          results.stripe = true;
          logger.info(`✅ Manual Stripe billing sync completed for ${userId}`);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          logger.error(
            `❌ Manual Stripe billing sync failed for ${userId}:`,
            message
          );
          results.errors.push(`Stripe: ${message}`);
        }
      }

      return {
        success: results.errors.length === 0,
        results,
        message:
          results.errors.length === 0? "User synced successfully":
            "Sync completed with some errors",
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Error in manual sync for ${userId}:`, message);
      throw new HttpsError("internal", message);
    }
  }
);
