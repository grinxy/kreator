import { useState } from 'react'
import type { FormData, FormErrors } from '@/types/registration-form'
import { validateForm, isFormValid } from '@/lib/validation'

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  profession: "",
  zone: "",
  whatsapp: "",
  role: "professional",
  interestedInLeadership: false,
  acceptTerms: false,
}

export function useRegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formErrors = validateForm(formData)
    setErrors(formErrors)

    if (!isFormValid(formErrors)) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with Firebase Auth registration
      console.log("Form data to submit:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("¡Registro exitoso! Te contactaremos pronto.")
      setFormData(initialFormData)
      setErrors({})
    } catch (error) {
      console.error("Registration error:", error)
      alert("Error al enviar el formulario. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitting(false)
  }

  return {
    formData,
    errors,
    isSubmitting,
    updateFormData,
    handleSubmit,
    resetForm,
  }
}