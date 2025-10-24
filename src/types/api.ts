export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

export interface RegistrationResponse {
  id: string
  email: string
  name: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
}