import { useState } from 'react'
import type { LoginFormData, LoginErrors } from '@/types/login'
import { loginUser } from '@/lib/auth.old'

const initialFormData: LoginFormData = {
  email: '',
  password: ''
}

export function useLoginForm() {

  // remember to change the import from loginUser to the new auth file when ready
  const [formData, setFormData] = useState<LoginFormData>(initialFormData)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const updateFormData = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): LoginErrors => {
    const newErrors: LoginErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria'
    }
    
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formErrors = validateForm()
    setErrors(formErrors)
    
    if (Object.keys(formErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const user = await loginUser(formData.email, formData.password)
      console.log('Login successful:', user)
      
      setLoginSuccess(true)
      setFormData(initialFormData)
      setErrors({})
      
      // TODO: Redirect to dashboard or handle success
      
    } catch (error: any) {
      console.error('Login error:', error)
      setErrors({ general: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitting(false)
    setLoginSuccess(false)
  }

  return {
    formData,
    errors,
    isSubmitting,
    loginSuccess,
    updateFormData,
    handleSubmit,
    resetForm
  }
}