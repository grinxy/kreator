import { Timestamp } from "firebase/firestore"

export interface Zone {
  region: string
  comarca: string
  province: string
  postal_code?: string
  neighborhood?: string
}

export interface UserDocument {
  id?: string
  name: string
  email: string
  phone: string
  street_address?: string
  postal_code?: string
  city?: string
  province_address?: string
  country?: string
  profession: string
  custom_profession?: string | null
  nif_cif?: string
  role: "professional" | "team_leader" | "admin"
  zone: Zone
  zone_assigned?: boolean
  zone_assignment_date?: Timestamp
  referred_by?: string | null // Code KR-XXXX received at the URL

  contacts_estimate?: number
  interested_in_leadership: boolean
  status: "pending" | "approved" | "rejected"
  payment_status?: "pending" | "completed" | "failed" | "error"
  payment_method_id?: string
  auth_uid?: string

  // === Registration statuses ===
  registration_status?:
    | "personal_data_completed"
    | "payment_method_pending"
    | "payment_method_completed"
    | "pending_approval"
    | "approved_payment_pending"
    | "fully_completed"
    | "error"

  registration_step?: number
  registration_started_at?: Timestamp
  registration_completed_at?: Timestamp | null
  step_1_completed_at?: Timestamp
  step_2_completed_at?: Timestamp | null
  step_3_completed_at?: Timestamp | null
  step_4_completed_at?: Timestamp | null
  last_activity_at?: Timestamp

  registration_order?: number
  created_at: Timestamp
  updated_at: Timestamp
}

export interface UserResponse {
  id: string
  email: string
  name: string
  status: "pending" | "approved" | "rejected"
  created_at: Date
}
