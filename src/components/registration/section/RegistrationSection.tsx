"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { RegistrationForm } from "@/components/registration/form/RegistrationForm"
import { RegistrationPayment } from "@/components/registration/payment/RegistrationPayment"
import { RegistrationSuccess } from "@/components/registration/success/RegistrationSuccess"

import { httpsCallable } from "firebase/functions"
import { functions } from "@/lib/firebase"

import { useNavigationLoader } from "@/providers/navigation-loader-provider"

import type { CreateSetupIntentRequest, CreateSetupIntentResponse } from "@/types/stripe"

export function RegistrationSection() {
  const searchParams = useSearchParams()
  const leadershipParam = searchParams.get("leadership")
  const initialInterestedInLeadership = leadershipParam === "1"

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [customerId, setCustomerId] = useState<string | null>(null)

  const { showLoader, hideLoader } = useNavigationLoader()

  // 1) When the form is completed
  const handleFormFinished = async (data: { userId: string; email: string; name: string }) => {
    showLoader()

    try {
      setUserId(data.userId)
      setUserEmail(data.email)
      setUserName(data.name)

      console.log("📝 Creando SetupIntent para usuario:", data.userId)

      const createSI = httpsCallable<CreateSetupIntentRequest, CreateSetupIntentResponse>(
        functions,
        "createSetupIntent"
      )

      const result = await createSI({
        userId: data.userId,
        email: data.email,
        name: data.name,
      })

      console.log("✅ SetupIntent creado:", {
        clientSecret: result.data.clientSecret?.substring(0, 20) + "...",
        customerId: result.data.customerId,
      })

      setClientSecret(result.data.clientSecret)
      setCustomerId(result.data.customerId)

      // Only proceed if we have clientSecret
      if (result.data.clientSecret) {
        setStep(2)
      } else {
        throw new Error("No se recibió clientSecret del servidor")
      }
    } catch (error) {
      
      // Display error to user
      alert("Error al preparar el método de pago. Por favor, intenta de nuevo.")
      
    } finally {
      hideLoader()
    }
  }

  // 2) Stripe validated the card
  const handlePaymentCompleted = () => {
    setStep(3)
  }

  return (
    <SectionWrapper id="registro" className="py-20 bg-[var(--kreator-gray-light)]/60">
      <div className="max-w-7xl mx-auto">
        {/* STEP 1 → FORM */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0">
            {/* LEFT COLUMN */}
            <div className="space-y-8 text-center lg:text-left">
              <p className="text-sm uppercase tracking-wide text-[var(--kreator-blue)] font-semibold">
                Paso 1 de 2
              </p>

              <h1 className="text-3xl lg:text-5xl text-[var(--kreator-blue)] font-[family-name:var(--font-poppins)] leading-tight">
                Únete a la Comunidad
                <br />
                Kreator
              </h1>

              <p className="text-lg text-[var(--kreator-gray-dark)] font-[family-name:var(--font-opensans)] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Forma parte de la primera <strong>comunidad empresarial por equipos</strong> donde cada
                profesional aporta valor, comparte contactos y crece acompañado.
              </p>

              <p className="text-lg text-[var(--kreator-gray-dark)] font-[family-name:var(--font-opensans)] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Las plazas se asignan por orden de llegada. Si tu sector aún está libre, <strong>lo bloquearemos para ti</strong>.
              </p>

              <ul className="space-y-4 pt-4 max-w-lg mx-auto lg:mx-0">
                {[
                  "Comisiones desde el primer mes",
                  "Sin permanencia ni compromisos",
                  "Equipos locales colaborativos",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[var(--kreator-blue)] text-white text-sm font-bold shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-[var(--kreator-gray-dark)] text-base leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <RegistrationForm
              initialInterestedInLeadership={initialInterestedInLeadership}
              onFinishedRegistrationForm={handleFormFinished}
            />
          </div>
        )}

        {/* STEP 2 → CARD */}
        {step === 2 && clientSecret && userId && userName && (
          <RegistrationPayment
            clientSecret={clientSecret}
            userId={userId}
            name={userName}
            onComplete={handlePaymentCompleted}
          />
        )}

        {/* STEP 3 → CONFIRMATION */}
        {step === 3 && userEmail && (
          <RegistrationSuccess email={userEmail} />
        )}
      </div>
    </SectionWrapper>
  )
}
