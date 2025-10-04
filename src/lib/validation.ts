import type { FormData, FormErrors } from '@/types/registration-form'

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}

  if (!formData.firstName.trim()) {
    errors.firstName = "El nombre es obligatorio"
  } else if (formData.firstName.length < 2) {
    errors.firstName = "El nombre debe tener al menos 2 caracteres"
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Los apellidos son obligatorios"
  } else if (formData.lastName.length < 2) {
    errors.lastName = "Los apellidos deben tener al menos 2 caracteres"
  }

  if (!formData.email.trim()) {
    errors.email = "El email es obligatorio para crear tu cuenta"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "El formato del email no es válido"
  }

  if (!formData.profession) {
    errors.profession = "La profesión es obligatoria"
  }

  if (!formData.zone) {
    errors.zone = "La zona es obligatoria"
  }

  if (formData.whatsapp && !/^\+?[\d\s-()]{9,}$/.test(formData.whatsapp)) {
    errors.whatsapp = "Formato de WhatsApp inválido"
  }

  if (!formData.acceptTerms) {
    errors.acceptTerms = "Debes aceptar los términos y condiciones"
  }

  return errors
}

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0
}