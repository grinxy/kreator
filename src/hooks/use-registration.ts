import { useState, useCallback } from "react"
import type { FormData, FormErrors } from "@/types/registration-form"
import {
  validateForm,
  validateField,
  isFormValid,
  sanitizeInput,
  debounce,
} from "@/lib/validation"
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

export function useRegistrationForm(initialInterestedInLeadership = false) {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    interestedInLeadership: initialInterestedInLeadership,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>("")
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Eliminamos registrationSuccess y userEmail
  // El éxito ahora lo controla RegistrationSection + Stripe Flow

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
    const sanitizedValue =
      typeof value === "string" &&
      ![
        "firstName",
        "lastName",
        "professionSearch",
        "zoneSearch",
        "customProfession",
      ].includes(field)
        ? sanitizeInput(value)
        : value

    setFormData(prev => ({ ...prev, [field]: sanitizedValue }))

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    if (
      hasSubmitted &&
      ["firstName", "lastName", "email", "phone", "nifCif"].includes(field)
    ) {
      debouncedValidateField(field, sanitizedValue)
    }
  }

  const handleFieldBlur = (field: keyof FormData) => {
    if (!hasSubmitted) return

    const value = formData[field]
    if (
      ["firstName", "lastName", "email", "phone", "profession", "zone", "nifCif"].includes(
        field
      )
    ) {
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
          customProfession:
            "Por favor especifica tu profesión si seleccionas 'Otros'.",
        }))
        return null
      }

      const formErrors = validateForm(formData)
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors)
        return null
      }

      setIsSubmitting(true)
      setSubmitError("")

      try {
        console.log("Step 1: Creating Firebase Auth user...")
        const authResult = await AuthService.createUser(
          formData.email,
          formData.firstName,
          formData.lastName
        )

        if (!authResult.success || !authResult.data) {
          console.error("Auth creation failed:", authResult.error)

          if (authResult.error?.code === "auth/email-already-in-use") {
            setErrors(prev => ({
              ...prev,
              email:
                "No ha sido posible completar el registro con los datos introducidos. Si ya te habías registrado, revisa tus mensajes o espera nuestra confirmación.",
            }))
          } else {
            setSubmitError(
              authResult.error?.message ||
                "Ha ocurrido un error inesperado al procesar el registro. Inténtalo de nuevo."
            )
          }

          setIsSubmitting(false)
          return null
        }

        const userUid = authResult.data.uid
        console.log("Auth user created with UID:", userUid)

        await new Promise(resolve => setTimeout(resolve, 1000))

        console.log("Step 2: Creating Firestore document with UID as ID...")
        const firestoreResult = await UserService.createUser(formData, userUid)

        if (!firestoreResult.success) {
          console.error("Firestore creation failed:", firestoreResult.error)
          setSubmitError("Error al guardar los datos del usuario")
          return null
        }

        console.log("Step 2 SUCCESS: Firestore user saved.")

        //  Aquí devolvemos al padre LO NECESARIO PARA STRIPE
        return {
          userId: userUid, // ⬅ UID de Firebase Auth
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
        }
      } catch (error) {
        console.error("Unexpected registration error:", error)
        setSubmitError("Error inesperado. Por favor, inténtalo de nuevo.")
        return null
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
    setSubmitError("")
    setHasSubmitted(false)
  }

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    updateFormData,
    handleFieldBlur,
    handleSubmit,
    resetForm,
  }
}
