"use client"

import { FieldWrapper, ValidationError } from "@/components/ui/validation"
import { Input } from "@/components/ui/input"


type Props = {
  formData: any
  errors: any
  updateFormData: any
  handleFieldBlur: any
}


export function RegistrationPersonalInfo({ formData, errors, updateFormData, handleFieldBlur }: Props) {
  return (
    <fieldset>
      <legend className="sr-only">Información personal</legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <FieldWrapper label="Nombre" required error={errors.firstName}>
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
            autoComplete="given-name"
          />
        </FieldWrapper>

        {/* Apellidos */}
        <FieldWrapper label="Apellidos" required error={errors.lastName}>
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
            autoComplete="family-name"
          />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Email */}
        <FieldWrapper label="Email" required error={errors.email}>
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
            autoComplete="email"
          />
        </FieldWrapper>

        {/* Teléfono */}
        <FieldWrapper label="Teléfono" required error={errors.phone}>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={e => updateFormData("phone", e.target.value)}
            onBlur={() => handleFieldBlur("phone")}
            className={errors.phone ? "border-red-300 focus:border-red-500" : ""}
            placeholder="600 000 000"
            aria-required="true"
            aria-invalid={!!errors.phone}
            autoComplete="tel"
          />
        </FieldWrapper>

        {/* NIF/CIF/NIE */}
        <FieldWrapper label="NIF/CIF/NIE" required error={errors.nifCif}>
          <Input
            id="nifCif"
            type="text"
            value={formData.nifCif || ""}
            onChange={e => updateFormData("nifCif", e.target.value.toUpperCase())}
            onBlur={() => handleFieldBlur("nifCif")}
            className={errors.nifCif ? "border-red-300 focus:border-red-500" : ""}
            placeholder="12345678Z · A12345674 · X1234567L"
            aria-required="true"
            aria-invalid={!!errors.nifCif}
            maxLength={9}
          />
        </FieldWrapper>
      </div>
    </fieldset>
  )
}
