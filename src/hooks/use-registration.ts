import { useState, useCallback, useEffect } from "react"
import type { FormData, FormErrors } from "@/types/registration-form"
import { validateForm, validateField, sanitizeInput, debounce } from "@/lib/validation"
import { UserService } from "@/services/user-service"
import { AuthService } from "@/services/auth"
import { ReferralService } from "@/services/referral-service"

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
  referralCode: "",
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
      !["firstName", "lastName", "professionSearch", "zoneSearch", "customProfession"].includes(field)
        ? sanitizeInput(value)
        : value

    setFormData(prev => ({ ...prev, [field]: sanitizedValue }))

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    if (hasSubmitted && ["firstName", "lastName", "email", "phone", "nifCif"].includes(field)) {
      debouncedValidateField(field, sanitizedValue)
    }
  }

  useEffect(() => {
    const ref = ReferralService.getReferralCodeFromUrl()
    updateFormData("referralCode", ref ?? "")
  }, [])

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
        const authResult = await AuthService.createUser(formData.email, formData.firstName, formData.lastName)

        if (!authResult.success || !authResult.data) {
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

        await new Promise(resolve => setTimeout(resolve, 1000))

        const firestoreResult = await UserService.createUser(formData, userUid)

        if (!firestoreResult.success) {
          setSubmitError("Error al guardar los datos del usuario")
          return null
        }

        return {
          userId: userUid,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
        }
      } catch (error) {
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
