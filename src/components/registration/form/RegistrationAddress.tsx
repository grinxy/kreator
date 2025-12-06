"use client"
import { FieldWrapper } from "@/components/ui/validation"
import { Input } from "@/components/ui/input"
import type { FormData, FormErrors } from "@/types/registration-form"

type Props = {
  formData: FormData
  errors: FormErrors
  hasSubmitted: boolean
  updateFormData: (field: keyof FormData, value: any) => void
  handleFieldBlur: (field: keyof FormData) => void
}

export function RegistrationAddress({ formData, errors, hasSubmitted, updateFormData, handleFieldBlur }: Props) {
  return (
    <fieldset>
      <legend className="sr-only">Dirección de facturación</legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldWrapper label="Dirección de facturación" required error={hasSubmitted ? errors.streetAddress : undefined}>
          <Input
            id="streetAddress"
            type="text"
            value={formData.streetAddress}
            onChange={e => updateFormData("streetAddress", e.target.value)}
            onBlur={() => handleFieldBlur("streetAddress")}
            placeholder="Calle, número, piso…"
          />
        </FieldWrapper>

        <FieldWrapper label="Código Postal" required error={hasSubmitted ? errors.postalCode : undefined}>
          <Input
            id="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={e => updateFormData("postalCode", e.target.value)}
            onBlur={() => handleFieldBlur("postalCode")}
            placeholder="08001"
            maxLength={5}
          />
        </FieldWrapper>

        <FieldWrapper label="Ciudad" required error={hasSubmitted ? errors.city : undefined}>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={e => updateFormData("city", e.target.value)}
            onBlur={() => handleFieldBlur("city")}
            placeholder="Barcelona"
          />
        </FieldWrapper>

        <FieldWrapper label="Provincia" required error={hasSubmitted ? errors.provinceAddress : undefined}>
          <Input
            id="provinceAddress"
            type="text"
            value={formData.provinceAddress}
            onChange={e => updateFormData("provinceAddress", e.target.value)}
            onBlur={() => handleFieldBlur("provinceAddress")}
            placeholder="Barcelona"
          />
        </FieldWrapper>

        <FieldWrapper label="País" required error={hasSubmitted ? errors.country : undefined}>
          <Input
            id="country"
            type="text"
            value={formData.country}
            onChange={e => updateFormData("country", e.target.value)}
            onBlur={() => handleFieldBlur("country")}
            placeholder="España"
          />
        </FieldWrapper>
      </div>
    </fieldset>
  )
}
