import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { ApiResponse, ApiError } from '@/types/api'

export interface AuthUserResponse {
  uid: string
  email: string
  emailVerified: boolean
}

export class AuthService {
  static async createUser(email: string): Promise<ApiResponse<AuthUserResponse>> {
    try {
      // Generate a temporary password (users will reset it later)
      const tempPassword = this.generateTempPassword()
      
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword)
      
      // Send email verification
      await sendEmailVerification(userCredential.user)
      
      const response: AuthUserResponse = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        emailVerified: userCredential.user.emailVerified
      }

      return {
        success: true,
        data: response
      }

    } catch (error: any) {
      console.error('Error creating auth user:', error)

      const apiError: ApiError = {
        code: error.code || 'AUTH_CREATION_FAILED',
        message: this.getAuthErrorMessage(error.code) || 'Error al crear la cuenta',
        details: { originalError: error.message }
      }

      return {
        success: false,
        error: apiError
      }
    }
  }

  private static generateTempPassword(): string {
    // Generate a secure temporary password
    return Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12).toUpperCase() + '!1'
  }

  private static getAuthErrorMessage(errorCode?: string): string {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'Ya existe una cuenta con este email',
      'auth/invalid-email': 'Email inválido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña es muy débil',
      'auth/network-request-failed': 'Error de conexión. Inténtalo de nuevo'
    }

    return errorMessages[errorCode || ''] || 'Error de autenticación'
  }
}