export interface CreateSetupIntentRequest {
  userId: string;
  email: string;
  name: string;
}

export interface CreateSetupIntentResponse {
  success: boolean;
  customerId: string;
  clientSecret: string;
}
