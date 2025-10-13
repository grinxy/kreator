import type { FormData, FormErrors } from "@/types/registration-form"

// Only validate fields that need validation
type ValidatableFields = 'firstName' | 'lastName' | 'email' | 'phone' | 'profession' | 'zone' | 'acceptTerms'

// Centralized field validation rules - only for fields that need validation
const fieldValidators: Record<ValidatableFields, (value: any) => string | undefined> = {
  firstName: (value: string) => {
    if (!value?.trim()) return "El nombre es obligatorio."
    if (value.length < 2) return "Mínimo 2 caracteres."
    if (value.length > 50) return "Máximo 50 caracteres."
    if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) return "Solo letras y espacios."
    return undefined
  },
  
  lastName: (value: string) => {
    if (!value?.trim()) return "Los apellidos son obligatorios."
    if (value.length < 2) return "Mínimo 2 caracteres."
    if (value.length > 100) return "Máximo 100 caracteres."
    if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) return "Solo letras y espacios."
    return undefined
  },

  email: (value: string) => {
    if (!value?.trim()) return "El email es obligatorio."
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z]{2,})+$/
    if (!emailRegex.test(value)) return "Formato de email inválido."
    if (value.length > 254) return "Email demasiado largo."
    return undefined
  },

  phone: (value: string) => {
    if (!value?.trim()) return "El teléfono es obligatorio."
    const digitsOnly = value.replace(/\D/g, "")
    if (digitsOnly.length < 9) return "Mínimo 9 dígitos."
    if (digitsOnly.length > 15) return "Máximo 15 dígitos."
    if (!/^[\+]?[\d\s\-\(\)]+$/.test(value)) return "Formato inválido."
    return undefined
  },

  profession: (value: string) => {
    if (!value) return "La profesión es obligatoria."
    return undefined
  },

  zone: (value: string) => {
    if (!value) return "La zona es obligatoria."
    return undefined
  },

  acceptTerms: (value: boolean) => {
    if (!value) return "Debes aceptar los términos y condiciones."
    return undefined
  }
}

const validatableFields: ValidatableFields[] = [
  'firstName', 'lastName', 'email', 'phone', 'profession', 'zone', 'acceptTerms'
]

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}

  validatableFields.forEach(field => {
    const validator = fieldValidators[field]
    const error = validator(formData[field])
    
    if (error) {
      (errors as any)[field] = error
    }
  })

  return errors
}

export const validateField = (field: keyof FormData, value: any): string | undefined => {
 
  if (field in fieldValidators) {
    const validator = fieldValidators[field as ValidatableFields]
    return validator(value)
  }
  // We return undefined for non-validatable fields
  return undefined
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
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