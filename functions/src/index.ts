import {onCall, HttpsError, onRequest} from "firebase-functions/v2/https";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import {initializeApp} from "firebase-admin/app";
import {getFirestore, FieldValue} from "firebase-admin/firestore";
import Stripe from "stripe";

initializeApp();
const db = getFirestore();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe
const getStripe = (): Stripe => {
  const stripeSecret =
    process.env.STRIPE_SECRET ||
    process.env.STRIPE_SECRET_KEY;

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

      await db.collection("users").doc(userId).update({
        stripeCustomerId: customer.id,
        setupIntentId: setupIntent.id,
        payment_status: "pending",
        createdAt: FieldValue.serverTimestamp(),
      });

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
 * 2. Approve registration + create subscription
 */
export const approveAndSubscribe = onCall(
  async (request) => {
    const {userId, customerId, priceId} = request.data;

    try {
      const stripe = getStripe();

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{price: priceId}],
        expand: ["latest_invoice.payment_intent"],
      });

      await db.collection("users").doc(userId).update({
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        approvedAt: FieldValue.serverTimestamp(),
      });

      return {
        success: true,
        subscriptionId: subscription.id,
        status: subscription.status,
      };
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
    const isApproved = afterData?.status === "aprobado";

    if (!statusChanged || !isApproved) return;

    try {
      const stripe = getStripe();
      const stripeCustomerId = afterData?.stripeCustomerId;
      const priceId =
        afterData?.priceId || process.env.DEFAULT_PRICE_ID;

      if (!stripeCustomerId) {
        throw new Error(
          `Missing Stripe customer for ${userId}`
        );
      }

      if (!priceId) throw new Error("Missing default price ID");

      const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{price: priceId}],
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
 * 4. Webhook for handling Stripe events (v2)
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
