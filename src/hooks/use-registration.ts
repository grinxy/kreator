import { useState } from 'react'
import type { FormData, FormErrors } from '@/types/registration-form'
import { validateForm, validateField, isFormValid, sanitizeInput } from '@/lib/validation'
import { registerUser } from '@/lib/auth'


const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  // password: "",          // Commented for future use
  // confirmPassword: "",   // Commented for future use
  profession: "",
  zone: "",
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
 
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value
    
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }))
    
    const fieldError = validateField(field, sanitizedValue)
    setErrors((prev) => ({ 
      ...prev, 
      [field]: fieldError 
    }))
  }

  const handleFieldBlur = (field: keyof FormData) => {
    const value = formData[field]
    
    // Check required fields on blur
    if (['firstName', 'lastName', 'email', 'phone', 'profession', 'zone'].includes(field)) {
      if (!value || (typeof value === 'string' && !value.trim())) {
        const fieldNames = {
          firstName: 'El nombre',
          lastName: 'Los apellidos', 
          email: 'El email',
          phone: 'El teléfono',
          profession: 'La profesión',
          zone: 'La zona'
        }
        setErrors(prev => ({
          ...prev,
          [field]: `${fieldNames[field as keyof typeof fieldNames]} es obligatorio`
        }))
      }
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
      // Register user with Firebase Auth using their chosen password
      const userProfile = await registerUser(formData)
      
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
    handleFieldBlur,
    updateFormData,
    handleSubmit,
    resetForm,
  }
}