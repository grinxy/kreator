"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ValidationError } from "@/components/ui/validation"

type Props = {
  formData: any
  errors: any
  updateFormData: any
}

export function RegistrationPreferences({ formData, errors, updateFormData }: Props) {
  return (
    <fieldset>
      <legend className="sr-only">Preferencias adicionales</legend>

      <div className="space-y-4">
        {/* --- Leadership checkbox --- */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="leadership"
            checked={formData.interestedInLeadership}
            onCheckedChange={checked => updateFormData("interestedInLeadership", checked)}
          />
          <Label htmlFor="leadership" className="text-sm cursor-pointer">
            Estoy abierto/a a asumir el rol de Jefe/a de Equipo más adelante.
          </Label>
        </div>

        {/* --- Terms & Privacy checkbox --- */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms}
            onCheckedChange={checked => updateFormData("acceptTerms", !!checked)}
            aria-required="true"
          />
          <div className="flex-1">
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              <span id="terms-description">
                Acepto la{" "}
                <a
                  href="/politica-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--kreator-orange)] hover:underline font-medium"
                >
                  Política de Privacidad
                </a>{" "}
                y los{" "}
                <a
                  href="/terminos-condiciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--kreator-orange)] hover:underline font-medium"
                >
                  Términos y Condiciones
                </a>
                . <span className="text-red-500">*</span>
              </span>
            </Label>

            {errors.acceptTerms && (
              <ValidationError message={errors.acceptTerms} variant="error" size="sm" />
            )}
          </div>
        </div>
      </div>
    </fieldset>
  )
}
