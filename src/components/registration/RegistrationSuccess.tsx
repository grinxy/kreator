"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface RegistrationSuccessProps {
  email: string
  onClose?: () => void
}

export function RegistrationSuccess({ email }: RegistrationSuccessProps) {
  const [countdown, setCountdown] = useState(30)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-12 min-h-[600px] flex flex-col justify-center">
      <div className="text-center space-y-8">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">¡Registro Exitoso!</h1>
          <div className="space-y-3 max-w-lg mx-auto">
            <p className="text-gray-600 text-base leading-relaxed">
              ¡Gracias por tu registro! En cuanto validemos que tu zona y profesión están disponibles,
              se procesará automáticamente el pago y tu plaza quedará reservada.
            </p>

            <p className="text-gray-600 text-base leading-relaxed">
              Te enviaremos un correo a{" "}
              <span className="font-semibold text-primary">{email}</span>{" "}
              con la confirmación y los próximos pasos.
            </p>
          </div>
        </div>

        <div className="space-y-6 max-w-sm mx-auto">
          <Button onClick={handleGoHome} variant="form" size="lg" className="w-full py-4 text-xl">
            Ir al Inicio
          </Button>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              Serás redirigido automáticamente al inicio en{" "}
              <span className="font-bold text-blue-800 text-lg">{countdown}</span>{" "}
              segundo{countdown !== 1 ? "s" : ""}.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 max-w-lg mx-auto">
          <p className="text-xs text-gray-500 leading-relaxed">
            Si tienes alguna pregunta sobre tu registro, no dudes en contactarnos. 
            Estaremos encantados de ayudarte en el proceso.
          </p>
        </div>
      </div>
    </div>
  )
}
