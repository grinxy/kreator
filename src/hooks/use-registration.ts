import { useState, useCallback, useRef } from 'react'
import type { FormData, FormErrors } from '@/types/registration-form'
import { validateForm, validateField, isFormValid, sanitizeInput, debounce } from '@/lib/validation'
import { registerUser } from '@/lib/auth'

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
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

  
  const debouncedValidateField = useCallback(
    debounce((field: keyof FormData, value: any) => {
      const fieldError = validateField(field, value)
      setErrors(prev => ({ 
        ...prev, 
        [field]: fieldError 
      }))
    }, 800), // 800ms delay - we change this value if needed
    []
  )

  const updateFormData = (field: keyof FormData, value: any) => {
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value
    
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }))
    
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    
    if (['firstName', 'lastName', 'email', 'phone'].includes(field)) {
      debouncedValidateField(field, sanitizedValue)
    }
  }

  const handleFieldBlur = (field: keyof FormData) => {
    const value = formData[field]
    
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
          [field]: `${fieldNames[field as keyof typeof fieldNames]} es obligatorio.`
        }))
      } else {
        const fieldError = validateField(field, value)
        setErrors(prev => ({ 
          ...prev, 
          [field]: fieldError 
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
      const userProfile = await registerUser(formData)
      
      setUserEmail(formData.email)
      setRegistrationSuccess(true)
      setFormData(initialFormData)
      setErrors({})
      
      console.log('Registration successful:', userProfile)
      
    } catch (error: any) {
      console.error("Registration error:", error)
      
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
    handleFieldBlur,
    handleSubmit,
    resetForm,
  }
}