import {onCall, HttpsError, onRequest} from "firebase-functions/v2/https";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
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
      throw new HttpsError(
        "invalid-argument",
        "Email is required"
      );
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

      return {
        setupIntentId: setupIntent.id,
        clientSecret: setupIntent.client_secret,
        customerId: customer.id,
      };
    } catch (error) {
      logger.error("Error creating setup intent:", error);

      if (error instanceof Stripe.errors.StripeError) {
        throw new HttpsError(
          "internal",
          `Stripe error: ${error.message}`
        );
      }

      throw new HttpsError(
        "internal",
        "Failed to create setup intent"
      );
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
      throw new HttpsError(
        "invalid-argument",
        "setupIntentId is required"
      );
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
        throw new
        Error("Missing paymentMethodId or customerId from SetupIntent");
      }

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

      logger.info(
        `Payment method ${paymentMethodId} saved for user ${userId}`
      );

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
 * 3. Firestore trigger (on status change)
 */
export const onUserStatusChange = onDocumentUpdated(
  "users/{userId}",
  async (event) => {
    const beforeData = event.data?.before.data();
    const afterData = event.data?.after.data();
    const userId = event.params.userId;

    const statusChanged = beforeData?.status !== afterData?.status;
    const isApproved = afterData?.status === "approved";

    if (!statusChanged || !isApproved) return;

    try {
      const stripe = getStripe();
      const stripeCustomerId = afterData?.stripe_customer_id;
      const paymentMethodId = afterData?.payment_method_id;

      // Load prices from .env
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

      // 1) Initial payment (first payment)
      await stripe.paymentIntents.create({
        amount: 9680, // 96.80 EUR (80 + 21% IVA)
        currency: "eur",
        customer: stripeCustomerId,
        payment_method: paymentMethodId,
        confirm: true,
        off_session: true,
        description: "Primer pago - 80€ + IVA (21%)",
        metadata: {
          userId,
          type: "initial_payment",
          base_amount: "8000", // 80 EUR
          tax_amount: "1680", // 16.80 EUR IVA
          tax_rate: "21",
        },
      });

      // 2) Create monthly subscription
      const subscription = await stripe.subscriptions.create({
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [req, res] = args as unknown as [any, any];

    try {
      // 1. Basic validation
      if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
      }

      const {userId, status} = req.body;

      if (!userId || !status) {
        return res.status(400).json({error: "Missing userId or status"});
      }

      // 2. Normalise the status coming from Airtable
      const normalizeStatus =
      (value: string): "pending" | "approved" | "rejected" => {
        const v = value.toLowerCase().trim();

        if (v === "pendiente") return "pending";
        if (v === "activa" || v === "activo") return "approved";
        if (v === "rechazado" || v === "rechazada") return "rejected";

        return "pending";
      };

      const normalized = normalizeStatus(status);

      logger.info(
        `🔄 Actualizando Firestore desde Airtable 
        → userId: ${userId}, status: ${normalized}`
      );

      // 3. Update Firestore
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [req, res] = args as unknown as [any, any];

    logger.info("📩 Webhook received.");

    if (!webhookSecret) {
      return res.status(500).send("Missing STRIPE_WEBHOOK_SECRET");
    }

    const stripe = getStripe();
    const signature = req.header("stripe-signature") ?? "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawBody = (req as any).rawBody as Buffer;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );
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
