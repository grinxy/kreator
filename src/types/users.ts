import { Timestamp } from 'firebase/firestore'

// Zone structure
export interface Zone {
  postal_code?: string
  city: string
  province: string
  neighborhood?: string
}

// User document structure (what goes in Firestore)
export interface UserDocument {
  id?: string
  name: string           // Combined firstName + lastName
  email: string
  phone: string
  profession: string
  nif_cif?: string       // Not collected yet, but ready for future
  role: 'professional' | 'team_leader' | 'admin'
  zone: Zone
  referrer_id?: string   // Not implemented yet
  contacts_estimate?: number // Not collected yet
  interested_in_leadership: boolean
  accept_terms: boolean
  status: 'pending' | 'approved' | 'rejected'
  created_at: Timestamp
  updated_at: Timestamp
}

// API response for user creation
export interface UserResponse {
  id: string
  email: string
  name: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: Date
}