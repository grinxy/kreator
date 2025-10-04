"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { zones, professions } from '@/data/registration'
import { useRegistrationForm } from '@/hooks/use-registration'
import { RegistrationSuccess } from '@/components/registration/registration-success'

export function RegistrationForm() {
  const {
    formData,
    errors,
    isSubmitting,
    registrationSuccess,
    userEmail,
    updateFormData,
    handleSubmit,
    resetForm,
  } = useRegistrationForm()

  if (registrationSuccess) {
    return <RegistrationSuccess email={userEmail} onClose={resetForm} />
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Únete a la Comunidad Kreator</h2>
        <p className="text-gray-600">Conecta con profesionales industriales y expande tu red de contactos</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-primary">Tipo de Registro *</Label>
          <RadioGroup
            value={formData.role}
            onValueChange={(value) => updateFormData("role", value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="professional" />
              <Label htmlFor="professional" className="cursor-pointer">
                Profesional
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="team-leader" id="team-leader" />
              <Label htmlFor="team-leader" className="cursor-pointer">
                Jefe de Equipo
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              Nombre *
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              className={errors.firstName ? "border-red-500" : ""}
              placeholder="Tu nombre"
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Apellidos *
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              className={errors.lastName ? "border-red-500" : ""}
              placeholder="Tus apellidos"
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Profesión *</Label>
            <Select value={formData.profession} onValueChange={(value) => updateFormData("profession", value)}>
              <SelectTrigger className={errors.profession ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecciona tu profesión" />
              </SelectTrigger>
              <SelectContent>
                {professions.map((profession) => (
                  <SelectItem key={profession} value={profession}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.profession && <p className="text-sm text-red-500">{errors.profession}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Zona/Región *</Label>
            <Select value={formData.zone} onValueChange={(value) => updateFormData("zone", value)}>
              <SelectTrigger className={errors.zone ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecciona tu zona" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.zone && <p className="text-sm text-red-500">{errors.zone}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-sm font-medium">
            WhatsApp
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => updateFormData("whatsapp", e.target.value)}
            placeholder="+34 600 000 000"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="leadership"
              checked={formData.interestedInLeadership}
              onCheckedChange={(checked) => updateFormData("interestedInLeadership", checked)}
            />
            <Label htmlFor="leadership" className="text-sm cursor-pointer leading-relaxed">
              Estoy abierto/a a asumir el rol de Jefe de Equipo más adelante.
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => updateFormData("acceptTerms", checked)}
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
              Acepto los{" "}
              <a href="#" className="text-secondary hover:underline font-medium">
                Términos y Condiciones
              </a>{" "}
              *
            </Label>
          </div>
          {errors.acceptTerms && <p className="text-sm text-red-500 ml-6">{errors.acceptTerms}</p>}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-3 text-lg transition-colors"
          >
            {isSubmitting ? "Enviando..." : "Únete a la Comunidad"}
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center">Los campos marcados con * son obligatorios</p>
      </form>
    </div>
  )
}