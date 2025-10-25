/*"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginForm } from '@/hooks/use-login'

export function LoginForm() {
  const {
    formData,
    errors,
    isSubmitting,
    loginSuccess,
    updateFormData,
    handleSubmit,
    resetForm
  } = useLoginForm()

  if (loginSuccess) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center space-y-4">
          <div className="text-green-600 text-5xl">✓</div>
          <h3 className="text-2xl font-bold text-primary">¡Bienvenido de vuelta!</h3>
          <p className="text-gray-600">Has iniciado sesión correctamente</p>
          <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
            Ir al Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Iniciar Sesión</h2>
        <p className="text-gray-600">Accede a tu cuenta Kreator</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}


        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={errors.email ? "border-red-500" : ""}
            placeholder="tu@email.com"
            autoComplete="email"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>


        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Contraseña *
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            className={errors.password ? "border-red-500" : ""}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>


        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-3 text-lg transition-colors"
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>


        <div className="text-center space-y-2">
          <a 
            href="#" 
            className="text-sm text-secondary hover:underline block"
          >
            ¿Olvidaste tu contraseña?
          </a>
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-secondary hover:underline font-medium">
              Regístrate aquí
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}*/