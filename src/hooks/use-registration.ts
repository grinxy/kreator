import { useState, useCallback } from 'react'
import type { FormData, FormErrors } from '@/types/registration-form'
import { validateForm, validateField, isFormValid, sanitizeInput, debounce } from '@/lib/validation'
import type { ApiResponse } from "@/types/api"
import type { UserResponse } from "@/types/database"
import { UserService } from '@/services/user-service'
import { AuthService } from '@/services/auth'

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
  const [submitError, setSubmitError] = useState<string>("")

  const debouncedValidateField = useCallback(
    debounce((field: keyof FormData, value: any) => {
      const fieldError = validateField(field, value)
      setErrors(prev => ({ 
        ...prev, 
        [field]: fieldError 
      }))
    }, 800),
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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Validate form
  const formErrors = validateForm(formData)
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors)
    return
  }

  setIsSubmitting(true)
  setSubmitError("")

  try {
    // Step 1: Create Firebase Auth user
    console.log('Step 1: Creating Firebase Auth user...')
    const authResult = await AuthService.createUser(formData.email)
    
    if (!authResult.success || !authResult.data) {
      console.error('Auth creation failed:', authResult.error)
      setSubmitError(authResult.error?.message || "Error al crear la cuenta de usuario")
      setIsSubmitting(false)
      return
    }

    console.log('Step 1 SUCCESS: Auth user created with UID:', authResult.data.uid)

    // Small delay to ensure Firebase Auth is fully processed
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Step 2: Create Firestore document with auth UID
    console.log('Step 2: Creating Firestore user document...')
    const firestoreResult = await UserService.createUser(formData, authResult.data.uid)
    
    if (firestoreResult.success && firestoreResult.data) {
      // SUCCESS! Both auth and firestore created
      console.log('Step 2 SUCCESS: Registration complete!', {
        authUid: authResult.data.uid,
        firestoreId: firestoreResult.data.id
      })
      
      setUserEmail(formData.email)
      setRegistrationSuccess(true)
      
    } else {
      console.error('Firestore creation failed:', firestoreResult.error)
      setSubmitError(firestoreResult.error?.message || "Error al guardar los datos del usuario")
    }

  } catch (error) {
    console.error('Unexpected registration error:', error)
    setSubmitError("Error inesperado. Por favor, inténtalo de nuevo.")
  } finally {
    setIsSubmitting(false)
  }
}, [formData])

  const resetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitting(false)
    setRegistrationSuccess(false)
    setUserEmail('')
    setSubmitError('')
  }

  return {
    formData,
    errors,
    isSubmitting,
    registrationSuccess,
    userEmail,
    submitError,
    updateFormData,
    handleFieldBlur,
    handleSubmit,
    resetForm,
  }
}