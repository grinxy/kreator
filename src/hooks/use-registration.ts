import { useState } from 'react'
import type { FormData, FormErrors } from '@/types/registration-form'
import { validateForm, isFormValid } from '@/lib/validation'
import { registerUser, sendPasswordResetEmail } from '@/lib/auth'

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
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState<string>('')

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
      // Register user with Firebase Auth only
      const userProfile = await registerUser(formData)
      
      // Send password reset email so user can set their own password
      await sendPasswordResetEmail(formData.email)
      
      setUserEmail(formData.email)
      setRegistrationSuccess(true)
      setFormData(initialFormData)
      setErrors({})
      
      console.log('Registration successful:', userProfile)
      
    } catch (error: any) {
      console.error("Registration error:", error)
      
      // Handle specific Firebase errors
      if (error.message.includes('email ya está registrado')) {
        setErrors({ email: error.message })
      } else if (error.message.includes('email inválido')) {
        setErrors({ email: error.message })
      } else {
        setErrors({ acceptTerms: error.message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitting(false)
    setRegistrationSuccess(false)
    setUserEmail('')
  }

  return {
    formData,
    errors,
    isSubmitting,
    registrationSuccess,
    userEmail,
    updateFormData,
    handleSubmit,
    resetForm,
  }
}