export interface ZoneSelection {
  region: string
  comarca: string
  province: string
}

export interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string           
  // password: string       // Commented for future use
  // confirmPassword: string // Commented for future use
  profession: string
  customProfession?: string
  professionSearch?: string
  zone: ZoneSelection | null
  zoneSearch: string
  role: "professional"
  interestedInLeadership: boolean
  createdAt?: Date
  status?: "pending" | "approved" | "rejected"
  id?: string
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
  nifCif?: string
}

export interface RegistrationValidationError {
  field: keyof FormData
  message: string
  code?: string
}