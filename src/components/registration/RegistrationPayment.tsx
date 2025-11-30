"use client"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { RegistrationPaymentForm } from "@/components/registration/RegistrationPaymentForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

interface Props {
  clientSecret: string
  userId: string
  name: string
  onComplete: () => void
}

export function RegistrationPayment({ clientSecret, userId, name, onComplete }: Props) {

  if (!clientSecret) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl text-center">
        <p className="text-gray-600">Cargando método de pago...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-[var(--kreator-gray-light)]">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-wide text-[var(--kreator-blue)] font-semibold">Paso 2</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--kreator-blue)] mt-2">Validación de método de pago</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {/* (INFO) */}
        <div className="space-y-4">
          <p className="text-[var(--kreator-gray-dark)] max-w-xl mx-auto mt-3 text-base leading-relaxed">
            Para completar tu registro, necesitamos <strong>validar tu tarjeta</strong>.
            <br />
            <span className="text-[var(--kreator-orange)] font-semibold">
              Este proceso no realiza ningún cargo en este momento.
            </span>
            <br />
            El primer pago solo se realizará cuando tu perfil sea aprobado por nuestro equipo.
          </p>
          <h3 className="text-lg md:text-xl font-semibold text-[var(--kreator-blue)]">
            ¿Por qué pedimos tus datos de tarjeta?
          </h3>
          <ul className="space-y-3 text-[var(--kreator-gray-dark)]">
            <li className="flex gap-2">
              <span className="text-[var(--kreator-blue)] font-bold">•</span>
              Para que podamos activar tu cuenta sin interrupciones una vez aprobada.
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--kreator-blue)] font-bold">•</span>
              No se realizará ningún cobro durante el registro.
            </li>
          </ul>
        </div>

        {/* (FORM) */}
        <div>
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#1e40af",
                  colorBackground: "#ffffff",
                  colorText: "#374151",
                  colorDanger: "#ef4444",
                  fontFamily: "system-ui, sans-serif",
                  spacingUnit: "4px",
                  borderRadius: "8px",
                },
                rules: {
                  ".Input": {
                    border: "1px solid #d1d5db",
                    boxShadow: "none",
                  },
                  ".Input:focus": {
                    border: "1px solid #1e40af",
                    boxShadow: "0 0 0 3px rgba(30, 64, 175, 0.1)",
                  },
                },
              },
            }}
          >
            <div className="bg-[var(--kreator-gray-light)]/40 p-6 rounded-xl shadow-sm border border-[var(--kreator-gray-light)]">
              <RegistrationPaymentForm
                clientSecret={clientSecret}
                userId={userId}
                name={name}
                onComplete={onComplete}
              />
            </div>
          </Elements>
        </div>
      </div>
    </div>
  )
}
