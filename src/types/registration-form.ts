export interface FormData {
  firstName: string
  lastName: string
  email: string
  profession: string
  zone: string
  whatsapp: string
  role: "professional" | "team-leader"
  interestedInLeadership: boolean
  acceptTerms: boolean
}

export interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  profession?: string
  zone?: string
  acceptTerms?: string
}

export type UserRole = "professional" | "team-leader"