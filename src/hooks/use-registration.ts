import { useState, useCallback } from "react"
import type { FormData, FormErrors } from "@/types/registration-form"
import { validateForm, validateField, isFormValid, sanitizeInput, debounce } from "@/lib/validation"
import { UserService } from "@/services/user-service"
import { AuthService } from "@/services/auth"

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profession: "",
  customProfession: "",
  professionSearch: "",
  zone: null,
  zoneSearch: "",
  role: "professional",
  interestedInLeadership: false,
  nifCif: "",
  acceptTerms: false,
}

export function useRegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState<string>("")
  const [submitError, setSubmitError] = useState<string>("")
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const debouncedValidateField = useCallback(
    debounce((field: keyof FormData, value: any) => {
      const fieldError = validateField(field, value)
      setErrors(prev => ({
        ...prev,
        [field]: fieldError,
      }))
    }, 800),
    []
  )

  const updateFormData = (field: keyof FormData, value: any) => {
    // Allow spaces in "Others (customProfession)"
    const sanitizedValue = typeof value === "string" && field !== "customProfession" ? sanitizeInput(value) : value

    setFormData(prev => ({ ...prev, [field]: sanitizedValue }))

    // clean up errors if the user corrects something
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    // progressive validations if sending has already been attempted
    if (hasSubmitted && ["firstName", "lastName", "email", "phone", "nifCif"].includes(field)) {
      debouncedValidateField(field, sanitizedValue)
    }
  }

  //  The blur only validates if the form has already been submitted.
  const handleFieldBlur = (field: keyof FormData) => {
    if (!hasSubmitted) return

    const value = formData[field]
    if (["firstName", "lastName", "email", "phone", "profession", "zone", "nifCif"].includes(field)) {
      if (!value || (typeof value === "string" && !value.trim())) {
        const fieldNames = {
          firstName: "El nombre",
          lastName: "Los apellidos",
          email: "El email",
          phone: "El teléfono",
          profession: "La profesión",
          zone: "La zona",
          nifCif: "El NIF/CIF/NIE",
        }
        setErrors(prev => ({
          ...prev,
          [field]: `${fieldNames[field as keyof typeof fieldNames]} es obligatorio.`,
        }))
      } else {
        const fieldError = validateField(field, value)
        setErrors(prev => ({
          ...prev,
          [field]: fieldError,
        }))
      }
    }
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      setHasSubmitted(true)

      if (formData.profession === "Otros" && !formData.customProfession?.trim()) {
        setErrors(prev => ({
          ...prev,
          customProfession: "Por favor especifica tu profesión si seleccionas 'Otros'.",
        }))
        return
      }

      const formErrors = validateForm(formData)
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors)
        return
      }

      setIsSubmitting(true)
      setSubmitError("")

      try {
        console.log("Step 1: Creating Firebase Auth user...")
        const authResult = await AuthService.createUser(formData.email, formData.firstName, formData.lastName)

        if (!authResult.success || !authResult.data) {
          console.error("Auth creation failed:", authResult.error)
          setSubmitError(authResult.error?.message || "Error al crear la cuenta de usuario")
          setIsSubmitting(false)
          return
        }

        console.log("Step 1 SUCCESS: Auth user created with UID:", authResult.data.uid)

        await new Promise(resolve => setTimeout(resolve, 1000))

        console.log("Step 2: Creating Firestore user document...")
        const firestoreResult = await UserService.createUser(formData, authResult.data.uid)

        if (firestoreResult.success && firestoreResult.data) {
          console.log("Step 2 SUCCESS: Registration complete!", {
            authUid: authResult.data.uid,
            firestoreId: firestoreResult.data.id,
          })

          setUserEmail(formData.email)
          setRegistrationSuccess(true)
        } else {
          console.error("Firestore creation failed:", firestoreResult.error)
          setSubmitError(firestoreResult.error?.message || "Error al guardar los datos del usuario")
        }
      } catch (error) {
        console.error("Unexpected registration error:", error)
        setSubmitError("Error inesperado. Por favor, inténtalo de nuevo.")
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData]
  )

  const resetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitting(false)
    setRegistrationSuccess(false)
    setUserEmail("")
    setSubmitError("")
    setHasSubmitted(false)
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
