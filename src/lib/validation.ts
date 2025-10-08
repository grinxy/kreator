import type { FormData, FormErrors } from "@/types/registration-form"

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}

  if (!formData.firstName.trim()) {
    errors.firstName = "El nombre es obligatorio"
  } else if (formData.firstName.length < 2) {
    errors.firstName = "El nombre debe tener al menos 2 caracteres"
  } else if (formData.firstName.length > 50) {
    errors.firstName = "El nombre no puede tener más de 50 caracteres"
  } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(formData.firstName)) {
    errors.firstName = "El nombre solo puede contener letras y espacios"
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Los apellidos son obligatorios"
  } else if (formData.lastName.length < 2) {
    errors.lastName = "Los apellidos deben tener al menos 2 caracteres"
  } else if (formData.lastName.length > 100) {
    errors.lastName = "Los apellidos no pueden tener más de 100 caracteres"
  } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(formData.lastName)) {
    errors.lastName = "Los apellidos solo pueden contener letras y espacios"
  }

  if (!formData.email.trim()) {
    errors.email = "El email es obligatorio"
  } else {
    // More strict email regex that requires a dot and extension
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z]{2,})+$/
    if (!emailRegex.test(formData.email)) {
      errors.email = "El formato del email no es válido (debe incluir @dominio.extension)"
    } else if (formData.email.length > 254) {
      errors.email = "El email es demasiado largo"
    }
  }

  if (!formData.phone.trim()) {
    errors.phone = "El teléfono es obligatorio"
  } else {
    const digitsOnly = formData.phone.replace(/\D/g, "")

    if (digitsOnly.length < 9) {
      errors.phone = "El teléfono debe tener al menos 9 dígitos"
    } else if (digitsOnly.length > 15) {
      errors.phone = "El teléfono no puede tener más de 15 dígitos"
    } else if (!/^[\+]?[\d\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = "Formato de teléfono inválido. Use solo números, espacios, guiones y paréntesis"
    }
  }

  if (!formData.profession) {
    errors.profession = "La profesión es obligatoria"
  }

  if (!formData.zone) {
    errors.zone = "La zona es obligatoria"
  }

  if (!formData.acceptTerms) {
    errors.acceptTerms = "Debes aceptar los términos y condiciones para continuar"
  }

  return errors
}

// Real-time field validation for better UX
export const validateField = (field: keyof FormData, value: any): string | undefined => {
  switch (field) {
    case "firstName":
      if (!value?.trim()) return undefined // Don't show error on empty until blur
      if (value.length < 2) return "Mínimo 2 caracteres"
      if (value.length > 50) return "Máximo 50 caracteres"
      if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) return "Solo letras y espacios"
      return undefined

    case "lastName":
      if (!value?.trim()) return undefined
      if (value.length < 2) return "Mínimo 2 caracteres"
      if (value.length > 100) return "Máximo 100 caracteres"
      if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) return "Solo letras y espacios"
      return undefined

    case "email":
      if (!value?.trim()) return undefined
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z]{2,})+$/
      if (!emailRegex.test(value)) return "Formato de email inválido (debe incluir @dominio.extension)"
      if (value.length > 254) return "Email demasiado largo"
      return undefined

    case "phone":
      if (!value?.trim()) return undefined
      const digitsOnly = value.replace(/\D/g, "")
      if (digitsOnly.length < 9) return "Mínimo 9 dígitos"
      if (digitsOnly.length > 15) return "Máximo 15 dígitos"
      if (!/^[\+]?[\d\s\-\(\)]+$/.test(value)) return "Formato inválido"
      return undefined

    default:
      return undefined
  }
}

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "")

  if (cleaned.startsWith("34")) {
    const number = cleaned.slice(2)
    if (number.length === 9) {
      return `+34 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`
    }
  } else if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }

  return phone
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, " ")
}
