import { Button } from "@/components/ui/button"

interface RegistrationSuccessProps {
  email: string
  onClose: () => void
}

export function RegistrationSuccess({ email, onClose }: RegistrationSuccessProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center space-y-6">
        <div className="text-green-600 text-6xl">✓</div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-primary">¡Registro Exitoso!</h3>
          <p className="text-gray-600">
            Te has unido a la comunidad Kreator
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Verificación de Email:</strong><br />
            Hemos enviado un email de verificación a <strong>{email}</strong>
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={onClose} className="w-full">
            Registrar Otro Usuario
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Volver al Inicio
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          Revisa tu bandeja de entrada y spam para verificar tu email
        </p>
      </div>
    </div>
  )
}