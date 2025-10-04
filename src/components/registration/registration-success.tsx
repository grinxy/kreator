import { CheckCircle, Mail, Key } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RegistrationSuccessProps {
  email: string
  onClose: () => void
}

export function RegistrationSuccess({ email, onClose }: RegistrationSuccessProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-primary">
            ¡Bienvenido a Kreator!
          </h3>
          <p className="text-gray-600">
            Tu cuenta ha sido creada exitosamente.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-blue-900">
                Verifica tu email
              </p>
              <p className="text-sm text-blue-700">
                Hemos enviado un enlace de verificación a <strong>{email}</strong>
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg flex items-start space-x-3">
            <Key className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-amber-900">
                Configura tu contraseña
              </p>
              <p className="text-sm text-amber-700">
                También recibirás un email para establecer tu contraseña personalizada
              </p>
            </div>
          </div>
        </div>

        <Button onClick={onClose} className="w-full">
          Continuar
        </Button>
      </div>
    </div>
  )
}