export interface CreateSetupIntentRequest {
  userId: string
  email: string
  name: string
}

export interface CreateSetupIntentResponse {
  setupIntentId: string
  clientSecret: string
  customerId: string
}
