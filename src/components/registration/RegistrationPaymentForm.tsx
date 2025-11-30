"use client"
import { 
  useStripe, 
  useElements, 
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js"
import { useState, useEffect } from "react"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/lib/firebase"
import { useSearchParams } from "next/navigation"
import type { StripeCardNumberElementChangeEvent } from "@stripe/stripe-js"

interface RegistrationPaymentFormProps {
  clientSecret: string
  userId: string
  name: string
  onComplete: () => void
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      color: "#374151",
      fontFamily: "system-ui, sans-serif",
      iconColor: "#9CA3AF",
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      color: "#EF4444",
      iconColor: "#EF4444",
    },
  },
  showIcon: true,
}


export function RegistrationPaymentForm({
  clientSecret,
  userId,
  name,
  onComplete,
}: RegistrationPaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const searchParams = useSearchParams()
  
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [cardholderName, setCardholderName] = useState<string>(name)

  const handleCardNumberChange = (event: StripeCardNumberElementChangeEvent) => {
    if (event.error) {
      setErrorMessage(event.error.message)
    } else {
      setErrorMessage(null)
    }
  }

  useEffect(() => {
    if (!stripe) return

    const setupSuccess = searchParams.get("setup_success")
    const setupIntentClientSecret = searchParams.get("setup_intent_client_secret")

    if (setupSuccess === "true" && setupIntentClientSecret) {
      handleSetupIntentReturn(setupIntentClientSecret)
    }
  }, [stripe, searchParams])

  const handleSetupIntentReturn = async (returnedClientSecret: string) => {
    if (!stripe) return
    setIsLoading(true)
    
    try {
      const { setupIntent, error } = await stripe.retrieveSetupIntent(returnedClientSecret)

      if (error) {
        setErrorMessage(error.message || "Error al verificar el pago")
        setIsLoading(false)
        return
      }

      if (setupIntent?.status === "succeeded") {
        await savePaymentMethodToFirebase(setupIntent.id)
      } else {
        setErrorMessage("La verificación de la tarjeta no se completó correctamente")
        setIsLoading(false)
      }
    } catch (err) {
      setErrorMessage("Error al procesar la verificación")
      setIsLoading(false)
    }
  }

  const savePaymentMethodToFirebase = async (setupIntentId: string) => {
    const savePaymentMethod = httpsCallable(functions, "savePaymentMethod")

    try {
      await savePaymentMethod({
        userId,
        setupIntentId,
      })
      onComplete()
    } catch (saveError) {
      setErrorMessage("Error al guardar tu método de pago")
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setErrorMessage("Stripe no se ha cargado correctamente")
      return
    }

    const cardNumberElement = elements.getElement(CardNumberElement)

    if (!cardNumberElement) {
      setErrorMessage("Error al cargar el formulario")
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const { error, setupIntent } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: cardholderName,
            },
          },
        }
      )

      if (error) {
        setErrorMessage(error.message || "Error al confirmar el pago")
        setIsLoading(false)
        return
      }

      if (setupIntent?.status === "succeeded") {
        await savePaymentMethodToFirebase(setupIntent.id)
      }
    } catch (err) {
      setErrorMessage("Error inesperado al procesar tu pago")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="cardholderName" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nombre del titular de la tarjeta
        </label>
        <input
          id="cardholderName"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="Nombre como aparece en la tarjeta"
          required
          className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:border-[var(--kreator-blue)] focus:ring-2 focus:ring-[var(--kreator-blue)]/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Número de tarjeta
        </label>
        <CardNumberElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleCardNumberChange}
          className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus-within:border-[var(--kreator-blue)] focus-within:ring-2 focus-within:ring-[var(--kreator-blue)]/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caducidad
          </label>
          <CardExpiryElement
            options={CARD_ELEMENT_OPTIONS}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus-within:border-[var(--kreator-blue)] focus-within:ring-2 focus-within:ring-[var(--kreator-blue)]/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVC
          </label>
          <CardCvcElement
            options={CARD_ELEMENT_OPTIONS}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus-within:border-[var(--kreator-blue)] focus-within:ring-2 focus-within:ring-[var(--kreator-blue)]/20 transition-all"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
          <p className="font-semibold">Error</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-[var(--kreator-yellow)] hover:bg-[var(--kreator-yellow)]/90 text-[var(--kreator-blue)] font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        {isLoading ? "Procesando..." : "Validar tarjeta"}
      </button>
    </form>
  )
}
