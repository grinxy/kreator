"use client"

import { useState } from "react"
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"

interface Props {
  clientSecret: string
  userId: string
  name: string
  onComplete: () => void
}

export function RegistrationPaymentForm({ clientSecret, userId, name, onComplete }: Props) {
  const stripe = useStripe()
  const elements = useElements()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [cvcPlaceholder, setCvcPlaceholder] = useState("CVC")

  // Detectar tipo de tarjeta
  const handleCardNumberChange = (event: any) => {
    const brand = event.brand

    switch (brand) {
      case "amex":
        setCvcPlaceholder("CID (4 dígitos)")
        break
      case "visa":
      case "mastercard":
      case "maestro":
        setCvcPlaceholder("CVC (3 dígitos)")
        break
      default:
        setCvcPlaceholder("CVC")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)
    setErrorMessage(null)

    const cardNumberElement = elements.getElement(CardNumberElement)
    if (!cardNumberElement) return

    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: { name },
      },
    })

    if (error) {
      setErrorMessage(error.message || "Error al validar la tarjeta")
      setIsLoading(false)
      return
    }

    await fetch("/api/save-payment-method", {
      method: "POST",
      body: JSON.stringify({
        userId,
        paymentMethodId: setupIntent.payment_method,
      }),
    })

    onComplete()
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Número de tarjeta */}
      <div className="border rounded-lg p-3 bg-white">
        <CardNumberElement
          onChange={handleCardNumberChange}
          options={{
            placeholder: "Ej. 4242 4242 4242 4242",
            showIcon: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                "::placeholder": {
                  color: "#999",
                },
              },
            },
          }}
        />
      </div>

      {/* Expiración + CVC */}
      <div className="flex gap-3">
        <div className="flex-1 border rounded-lg p-3 bg-white">
          <CardExpiryElement
            options={{
              placeholder: "MM / AA",
              style: {
                base: { fontSize: "16px", color: "#000" },
              },
            }}
          />
        </div>

        <div className="flex-1 border rounded-lg p-3 bg-white">
          <CardCvcElement
            options={{
              placeholder: cvcPlaceholder,
              style: {
                base: { fontSize: "16px", color: "#000" },
              },
            }}
          />
        </div>
      </div>

      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

      <Button
        type="submit"
        className="w-full bg-[var(--kreator-yellow)] hover:bg-[var(--kreator-yellow)]/90 text-primary font-semibold py-3 text-lg cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? "Validando..." : "Validar tarjeta"}
      </Button>
    </form>
  )
}
