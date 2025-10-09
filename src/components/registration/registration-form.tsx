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
        <h1 className="text-3xl font-bold text-primary mb-2">Únete a la Comunidad Kreator</h1>
        <p className="text-gray-600">Conecta con profesionales industriales y expande tu red de contactos</p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        noValidate
        aria-label="Formulario de registro a la comunidad Kreator"
      >
        {/* General Error Alert */}
        {errors.acceptTerms && (
          <div 
            className="bg-red-50 border border-red-200 rounded-lg p-4"
            role="alert"
            aria-live="polite"
          >
            <ValidationError message={errors.acceptTerms} variant="error" size="md" />
          </div>
        )}

        {/* Role Selection */}
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700">
            Tipo de Registro <span className="text-red-500 ml-1" aria-label="obligatorio">*</span>
          </legend>
          <RadioGroup
            value={formData.role}
            onValueChange={value => updateFormData("role", value)}
            className="flex gap-6"
            aria-required="true"
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
        </fieldset>

        {/* Name Fields */}
        <fieldset>
          <legend className="sr-only">Información personal</legend>
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
                aria-required="true"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                autoComplete="given-name"
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
                aria-required="true"
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                autoComplete="family-name"
              />
            </FieldWrapper>
          </div>
        </fieldset>

        {/* Contact Fields */}
        <fieldset>
          <legend className="sr-only">Información de contacto</legend>
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
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : "email-description"}
                autoComplete="email"
              />
              <div id="email-description" className="sr-only">
                Introduce un email válido con formato usuario@dominio.extensión
              </div>
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
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : "phone-description"}
                autoComplete="tel"
              />
              <div id="phone-description" className="sr-only">
                Introduce un teléfono con al menos 9 dígitos
              </div>
            </FieldWrapper>
          </div>
        </fieldset>

        {/* Professional Info */}
        <fieldset>
          <legend className="sr-only">Información profesional</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldWrapper 
              label="Profesión" 
              required 
              error={errors.profession}
            >
              <Select 
                value={formData.profession} 
                onValueChange={value => updateFormData("profession", value)}
                required
              >
                <SelectTrigger 
                  className={errors.profession ? "border-red-300 focus:border-red-500" : ""}
                  aria-required="true"
                  aria-invalid={!!errors.profession}
                  aria-describedby={errors.profession ? "profession-error" : undefined}
                >
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
                required
              >
                <SelectTrigger 
                  className={errors.zone ? "border-red-300 focus:border-red-500" : ""}
                  aria-required="true"
                  aria-invalid={!!errors.zone}
                  aria-describedby={errors.zone ? "zone-error" : undefined}
                >
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
        </fieldset>

        {/* Checkboxes */}
        <fieldset>
          <legend className="sr-only">Preferencias adicionales</legend>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="leadership"
                checked={formData.interestedInLeadership}
                onCheckedChange={checked => updateFormData("interestedInLeadership", checked)}
                aria-describedby="leadership-description"
              />
              <Label htmlFor="leadership" className="text-sm cursor-pointer leading-relaxed">
                <span id="leadership-description">
                  Estoy abierto/a a asumir el rol de Jefe de Equipo más adelante.
                </span>
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={checked => updateFormData("acceptTerms", checked)}
                aria-required="true"
                aria-invalid={!!errors.acceptTerms}
                aria-describedby="terms-description"
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                <span id="terms-description">
                  Acepto los{" "}
                  <a 
                    href="#" 
                    className="text-secondary hover:underline font-medium"
                    aria-label="Leer términos y condiciones (se abre en nueva ventana)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Términos y Condiciones
                  </a>{" "}
                  <span className="text-red-500" aria-label="obligatorio">*</span>
                </span>
              </Label>
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-3 text-lg transition-colors"
            aria-describedby="submit-description"
          >
            {isSubmitting ? "Enviando..." : "Únete a la Comunidad"}
          </Button>
          <div id="submit-description" className="sr-only">
            {isSubmitting 
              ? "Enviando formulario de registro, por favor espera" 
              : "Enviar formulario de registro a la comunidad Kreator"
            }
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center" aria-live="polite">
          Los campos marcados con * son obligatorios
        </p>
      </form>
    </div>
  )
}