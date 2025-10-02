import type { FormData, FormErrors } from '@/types/registration-form'

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}

  if (!formData.firstName.trim()) {
    errors.firstName = "El nombre es obligatorio"
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Los apellidos son obligatorios"
  }

  if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "El formato del email no es válido"
  }

  if (!formData.profession) {
    errors.profession = "La profesión es obligatoria"
  }

  if (!formData.zone) {
    errors.zone = "La zona es obligatoria"
  }

  if (!formData.acceptTerms) {
    errors.acceptTerms = "Debes aceptar los términos y condiciones"
  }

  return errors
}

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0
}