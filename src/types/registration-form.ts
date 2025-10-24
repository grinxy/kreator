export interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string           
  // password: string       // Commented for future use
  // confirmPassword: string // Commented for future use
  profession: string
  zone: string
  role: "professional" | "team-leader"
  interestedInLeadership: boolean
  createdAt?: Date
  status?: "pending" | "approved" | "rejected",
  id?: string
  postalCode?: string
  nifCif?: string
  acceptTerms?: boolean
}

export interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string         
  phone?: string           
  // password?: string     // Commented for future use
  // confirmPassword?: string // Commented for future use
  profession?: string
  zone?: string
  role?: string
  acceptTerms?: string
  postalCode?: string
  nifCif?: string
}

export interface RegistrationValidationError {
  field: keyof FormData
  message: string
  code?: string
}