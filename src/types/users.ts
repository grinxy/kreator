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
  role: 'professional' | 'team_leader' | 'admin'
  zone: Zone
  referred_by?: string | null

  interested_in_leadership: boolean
  status: 'pending' | 'approved' | 'rejected'

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
