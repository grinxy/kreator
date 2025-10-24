import { Timestamp } from 'firebase/firestore'

export interface Zone {
  postal_code?: string
  city: string
  province: string
  neighborhood?: string
}

export interface UserDocument {
  id?: string
  name: string
  email: string
  phone: string
  profession: string
  nif_cif?: string
  role: 'professional' | 'team_leader' | 'admin'
  zone: Zone
  referrer_id?: string
  contacts_estimate?: number
  interested_in_leadership: boolean
  status: 'pending' | 'approved' | 'rejected'
  auth_uid?: string // Our "link" to Firebase Auth
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