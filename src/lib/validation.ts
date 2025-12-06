import type { FormData, FormErrors, ZoneSelection } from "@/types/registration-form"

// Updated validatable fields to include nifCif and zone
type ValidatableFields = "firstName" | "lastName" | "email" | "phone" | "profession" | "zone" | "acceptTerms" | "nifCif"

// Centralized field validation rules
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
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z]{2,})+$/
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

  zone: (value: ZoneSelection | null) => {
    if (!value || !value.comarca || !value.region) return "La zona es obligatoria."
    return undefined
  },

  nifCif: (value: string) => {
    if (!value?.trim()) return "El NIF/CIF/NIE es obligatorio."

    const cleanValue = value.trim().toUpperCase()

    // Check if it's a NIF - 8 digits + 1 letter
    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/
    if (nifRegex.test(cleanValue)) {
      return validateNIF(cleanValue)
    }

    // Check if it's NIE - X/Y/Z + 7 dígitos + letter
    const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/
    if (nieRegex.test(cleanValue)) {
      return validateNIE(cleanValue)
    }

    // Check if it's a CIF - 1 letter + 7 digits + 1 letter/digit
    const cifRegex = /^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/
    if (cifRegex.test(cleanValue)) {
      return validateCIF(cleanValue)
    }

    return "Formato NIF/CIF/NIE inválido. Ejemplos: 12345678Z (NIF), X1234567L (NIE), A12345674 (CIF)."
  },

  acceptTerms: (value: boolean) => {
    if (!value) return "Debes aceptar los términos y condiciones."
    return undefined
  },
}

// NIF validation with check digit
const validateNIF = (nif: string): string | undefined => {
  const letters = "TRWAGMYFPDXBNJZSQVHLCKE"
  const numbers = nif.slice(0, 8)
  const letter = nif.slice(8, 9)

  const expectedLetter = letters[parseInt(numbers) % 23]

  if (letter !== expectedLetter) {
    return "NIF inválido. La letra de control no es correcta."
  }

  return undefined
}

// NIE validation (X, Y o Z + 7 dígitos + letra)
const validateNIE = (nie: string): string | undefined => {
  const letters = "TRWAGMYFPDXBNJZSQVHLCKE"
  const prefix = nie.charAt(0)
  const numbers = nie.slice(1, 8)
  const letter = nie.slice(8, 9)

  // Replace initial letter with equivalent number
  const prefixNumber = prefix === "X" ? 0 : prefix === "Y" ? 1 : 2
  const fullNumber = parseInt(`${prefixNumber}${numbers}`, 10)
  const expectedLetter = letters[fullNumber % 23]

  if (letter !== expectedLetter) {
    return "NIE inválido. La letra de control no es correcta."
  }

  return undefined
}

// CIF validation with check digit
const validateCIF = (cif: string): string | undefined => {
  const organizationTypes = "ABCDEFGHJNPQRSUVW"
  const firstLetter = cif[0]
  const numbers = cif.slice(1, 8)
  const controlChar = cif[8]

  if (!organizationTypes.includes(firstLetter)) {
    return "CIF inválido. Letra de organización no válida."
  }

  // Calculate control digit
  let sum = 0
  for (let i = 0; i < numbers.length; i++) {
    let digit = parseInt(numbers[i])
    if (i % 2 === 1) {
      // Even positions (1, 3, 5...)
      sum += digit
    } else {
      // Odd positions (0, 2, 4, 6)
      digit *= 2
      sum += digit > 9 ? digit - 9 : digit
    }
  }

  const controlDigit = (10 - (sum % 10)) % 10
  const controlLetter = "JABCDEFGHI"[controlDigit]

  // Some CIFs end with letter, others with digit
  const expectedControls = [controlDigit.toString(), controlLetter]

  if (!expectedControls.includes(controlChar)) {
    return "CIF inválido. El dígito/letra de control no es correcto."
  }

  return undefined
}

const validatableFields: ValidatableFields[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "profession",
  "zone",
  "nifCif",
  "acceptTerms",
]

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}

  validatableFields.forEach(field => {
    const validator = fieldValidators[field]
    const fieldValue = (formData as any)[field]
    const error = validator(fieldValue)

    if (error) {
      ;(errors as any)[field] = error
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

// New formatter for NIF / CIF / NIE
export const formatNifCif = (value: string): string => {
  const cleaned = value.replace(/[^0-9A-Za-z]/g, "").toUpperCase()

  // NIF → 12345678Z
  if (/^[0-9]{8}[A-Z]$/.test(cleaned)) {
    return cleaned
  }

  // CIF → A12345674
  if (/^[A-Z][0-9]{7}[0-9A-Z]$/.test(cleaned)) {
    return cleaned
  }

  // NIE → X1234567L / Y1234567X / Z1234567T
  // (First letter can be X, Y or Z, followed by 7 digits and a final letter)
  if (/^[XYZ][0-9]{7}[A-Z]$/.test(cleaned)) {
    return cleaned
  }

  return cleaned
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, " ")
}
