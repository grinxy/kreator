import { Timestamp } from 'firebase/firestore'

export interface Zone {
  region: string // e.g., "ANDALUSIA", "MURCIA", "MADRID"
  comarca: string // e.g., "Almería", "Costa del Sol"
  province: string // e.g., "Almería", "Málaga"
  postal_code?: string
  neighborhood?: string
}

export interface UserDocument {
  id?: string
  name: string
  email: string
  phone: string
  profession: string
  custom_profession?: string | null
  nif_cif?: string
  role: 'professional' | 'team_leader' | 'admin'
  zone: Zone
  zone_assigned?: boolean // Whether they've been assigned their zone
  zone_assignment_date?: Timestamp // When zone was assigned
  referrer_id?: string
  contacts_estimate?: number
  interested_in_leadership: boolean
  status: 'pending' | 'approved' | 'rejected'
  payment_status?: 'pending' | 'completed' | 'failed' // For future Stripe integration
  payment_id?: string // Stripe payment ID
  auth_uid?: string // Our "link" to Firebase Auth
  registration_order?: number // For tracking who registered first
  created_at: Timestamp
  updated_at: Timestamp
}

export interface UserResponse {
  id: string
  email: string
  name: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: Date
}