import {onCall, HttpsError, onRequest} from "firebase-functions/v2/https";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import {initializeApp} from "firebase-admin/app";
import {getFirestore, FieldValue} from "firebase-admin/firestore";
import Stripe from "stripe";

initializeApp();
const db = getFirestore();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const getStripe = (): Stripe => {
  const stripeSecret =
    process.env.STRIPE_SECRET;

  if (!stripeSecret) {
    throw new Error("Missing STRIPE_SECRET");
  }

  return new Stripe(stripeSecret, {
    apiVersion: "2025-11-17.clover",
  });
};

/**
 * 1. Create customer + SetupIntent
 */
export const createSetupIntent = onCall(
  async (request) => {
    const {userId, name, email} = request.data;

    try {
      const stripe = getStripe();

      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          userId,
          registration_status: "pending_approval",
        },
      });

      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
      });

      await db.collection("users").doc(userId).set(
        {
          stripeCustomerId: customer.id,
          setupIntentId: setupIntent.id,
          payment_status: "pending",
          createdAt: FieldValue.serverTimestamp(),
        },
        {merge: true}
      );

      return {
        success: true,
        customerId: customer.id,
        clientSecret: setupIntent.client_secret,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new HttpsError("internal", message);
    }
  }
);

/**
 * 2. Save payment method after confirming SetupIntent
 */
export const savePaymentMethod = onCall(
  async (request) => {
    const {userId, paymentMethodId} = request.data;

    try {
      await db.collection("users").doc(userId).update({
        paymentMethodId,
      });

      return {success: true};
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
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
      const stripeCustomerId = afterData?.stripeCustomerId;
      const paymentMethodId = afterData?.paymentMethodId;

      // Cargar precios desde .env
      const initialAmount =
      Number(process.env.STRIPE_PRICE_FIRST_PAYMENT);
      const subscriptionPrice = process.env.STRIPE_PRICE_SUBSCRIPTION;

      if (!stripeCustomerId) {
        throw new Error(
          `Missing Stripe customer for ${userId}`
        );
      }

      if (!initialAmount || !subscriptionPrice) {
        throw new Error("Missing Price IDs or initial amount");
      }

      if (!paymentMethodId) {
        throw new Error(`Missing payment method for ${userId}`);
      }

      // 1) Initial payment (first payment)
      await stripe.paymentIntents.create({
        amount: initialAmount, // de env (4000 = 40 €)
        currency: "eur",
        customer: stripeCustomerId,
        payment_method: paymentMethodId,
        confirm: true,
        description: "Primer pago",
        metadata: {
          userId,
          type: "initial_payment",
        },
      });

      // 2) Create monthly subscription
      const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{price: subscriptionPrice}],
        expand: ["latest_invoice.payment_intent"],
      });

      await db.collection("users").doc(userId).update({
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        payment_status: "charged",
        approvedAt: FieldValue.serverTimestamp(),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

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

      console.log(
        `🔄 Actualizando Firestore desde Airtable →
      userId: ${userId}, status: ${normalized}`
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
      console.error("❌ Error updating Firestore from Airtable:", err);
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

    console.log("📩 Webhook received.");

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
      console.log("🔔 Event:", event.type);
    } catch (err) {
      console.error("❌ Signature verification failed:", err);
      return res.status(400).send("Invalid signature");
    }

    switch (event.type) {
    case "payment_intent.succeeded":
      console.log("💳 Payment OK");
      break;

    case "customer.subscription.deleted":
      console.log("❌ Subscription canceled");
      break;

    default:
      console.log(`ℹ️ Unhandled: ${event.type}`);
    }

    return res.status(200).json({received: true});
  }
);
