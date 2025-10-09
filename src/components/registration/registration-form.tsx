"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FieldWrapper, ValidationError } from "@/components/ui/validation"

import { zones, professions } from "@/data/registration"
import { useRegistrationForm } from "@/hooks/use-registration"
import { RegistrationSuccess } from "@/components/registration/registration-success"

export function RegistrationForm() {
  const { 
    formData, 
    errors, 
    isSubmitting, 
    registrationSuccess, 
    userEmail, 
    updateFormData, 
    handleFieldBlur,
    handleSubmit, 
    resetForm 
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
        {/* General Error Alert */}
        {errors.acceptTerms && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ValidationError message={errors.acceptTerms} variant="error" size="md" />
          </div>
        )}

        {/* Role Selection */}
        <FieldWrapper label="Tipo de Registro" required>
          <RadioGroup
            value={formData.role}
            onValueChange={value => updateFormData("role", value)}
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
        </FieldWrapper>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper 
            label="Nombre" 
            required 
            error={errors.firstName}
          >
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={e => updateFormData("firstName", e.target.value)}
              onBlur={() => handleFieldBlur("firstName")}
              className={errors.firstName ? "border-red-300 focus:border-red-500" : ""}
              placeholder="Tu nombre"
            />
          </FieldWrapper>

          <FieldWrapper 
            label="Apellidos" 
            required 
            error={errors.lastName}
          >
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={e => updateFormData("lastName", e.target.value)}
              onBlur={() => handleFieldBlur("lastName")}
              className={errors.lastName ? "border-red-300 focus:border-red-500" : ""}
              placeholder="Tus apellidos"
            />
          </FieldWrapper>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper 
            label="Email" 
            required 
            error={errors.email}
          >
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => updateFormData("email", e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              className={errors.email ? "border-red-300 focus:border-red-500" : ""}
              placeholder="tu@email.com"
            />
          </FieldWrapper>

          <FieldWrapper 
            label="Teléfono" 
            required 
            error={errors.phone}
          >
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={e => updateFormData("phone", e.target.value)}
              onBlur={() => handleFieldBlur("phone")}
              className={errors.phone ? "border-red-300 focus:border-red-500" : ""}
              placeholder="+34 600 000 000"
            />
          </FieldWrapper>
        </div>

        {/* Professional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper 
            label="Profesión" 
            required 
            error={errors.profession}
          >
            <Select 
              value={formData.profession} 
              onValueChange={value => updateFormData("profession", value)}
            >
              <SelectTrigger className={errors.profession ? "border-red-300 focus:border-red-500" : ""}>
                <SelectValue placeholder="Selecciona tu profesión" />
              </SelectTrigger>
              <SelectContent>
                {professions.map(profession => (
                  <SelectItem key={profession} value={profession}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>

          <FieldWrapper 
            label="Zona/Región" 
            required 
            error={errors.zone}
          >
            <Select 
              value={formData.zone} 
              onValueChange={value => updateFormData("zone", value)}
            >
              <SelectTrigger className={errors.zone ? "border-red-300 focus:border-red-500" : ""}>
                <SelectValue placeholder="Selecciona tu zona" />
              </SelectTrigger>
              <SelectContent>
                {zones.map(zone => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="leadership"
              checked={formData.interestedInLeadership}
              onCheckedChange={checked => updateFormData("interestedInLeadership", checked)}
            />
            <Label htmlFor="leadership" className="text-sm cursor-pointer leading-relaxed">
              Estoy abierto/a a asumir el rol de Jefe de Equipo más adelante.
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={checked => updateFormData("acceptTerms", checked)}
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
              Acepto los{" "}
              <a href="#" className="text-secondary hover:underline font-medium">
                Términos y Condiciones
              </a>{" "}
              *
            </Label>
          </div>
        </div>

        {/* Submit Button */}
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