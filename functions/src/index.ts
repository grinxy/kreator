import * as functions from "firebase-functions";
import Stripe from "stripe";

// Types for functions
interface CreateSetupIntentData {
  name: string;
  email: string;
}

interface ApproveAndSubscribeData {
  customerId: string;
  priceId: string;
}

// Function to get Stripe instance
const getStripe = (): Stripe => {
  const stripeSecret =
    functions.config().stripe?.secret || process.env.STRIPE_SECRET;

  if (!stripeSecret) {
    throw new Error("Missing STRIPE_SECRET in environment variables");
  }

  return new Stripe(stripeSecret, {
    apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
  });
};

/**
 * 1. Create customer + SetupIntent (validate card without charging)
 */
export const createSetupIntent = functions.https.onCall(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (data: any, context: any) => {
    const {name, email} = data as CreateSetupIntentData;

    // --- AUTH CHECK (TEMPORARILY DISABLED) ---
    // if (!context.auth) {
    //   throw new functions.https.HttpsError(
    //     "unauthenticated",
    //     "El usuario debe estar autenticado"
    //   );
    // }
    // -----------------------------------------------

    // CURRENT VERSION WITHOUT AUTH (Teaser Page)
    try {
      const stripe = getStripe();

      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          registration_status: "pending_approval",
          uid: context.auth?.uid || "anonymous",
        },
      });

      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
      });

      return {
        success: true,
        clientSecret: setupIntent.client_secret,
        customerId: customer.id,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      console.error("Error en createSetupIntent:", errorMessage);
      throw new functions.https.HttpsError("internal", errorMessage);
    }
  }
);

/**
 * 2. Approve registration + create subscription
 */
export const approveAndSubscribe = functions.https.onCall(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (data: any) => {
    const {customerId, priceId} = data as ApproveAndSubscribeData;

    // --- AUTH CHECK (DESACTIVADO TEMPORALMENTE) ---
    // if (!context.auth) {
    //   throw new functions.https.HttpsError(
    //     "unauthenticated",
    //     "El usuario debe estar autenticado"
    //   );
    // }
    // -----------------------------------------------

    // CURRENT VERSION WITHOUT AUTH (action performed manually by owner)
    try {
      const stripe = getStripe();

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{price: priceId}],
        expand: ["latest_invoice.payment_intent"],
      });

      return {
        success: true,
        subscriptionId: subscription.id,
        status: subscription.status,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      console.error("Error en approveAndSubscribe:", errorMessage);
      throw new functions.https.HttpsError("internal", errorMessage);
    }
  }
);

/**
 * 3. Webhook for handling Stripe events (placeholder)
 *
 * This webhook **does NOT validate signatures** because
 * we do not yet have webhook_secret.
 * It only returns 200 OK so that Stripe does not retry.
 */
export const stripeWebhook = functions.https.onRequest(
  async (req, res): Promise<void> => {
    console.log("📩 Webhook recibido (placeholder).");

    // If there is no webhook_secret → placeholder mode only
    const webhookSecret =
      functions.config().stripe?.webhook_secret ||
      process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret || webhookSecret === "placeholder") {
      console.warn("⚠️ Webhook no configurado. Modo placeholder.");
      res.json({received: true, mode: "placeholder"});
      return;
    }

    res.json({received: true, validated: false});
  }
);
