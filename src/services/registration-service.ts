import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'  // Using your existing firebase config
import type { FormData } from '@/types/registration-form'
import type { ApiResponse, RegistrationResponse, ApiError } from '@/types/api'

export class RegistrationService {
  private static COLLECTION_NAME = 'registrations'

  static async createRegistration(formData: FormData): Promise<ApiResponse<RegistrationResponse>> {
    try {
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        zone: formData.zone,
        role: formData.role,
        interestedInLeadership: formData.interestedInLeadership,
        acceptTerms: formData.acceptTerms,
        status: 'pending' as const,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), registrationData)

      return {
        success: true,
        data: {
          id: docRef.id,
          email: formData.email,
          status: 'pending',
          createdAt: new Date()
        }
      }

    } catch (error: any) {
      console.error('Error creating registration:', error)

      return {
        success: false,
        error: {
          code: error.code || 'REGISTRATION_FAILED',
          message: error.message || 'Error al procesar el registro'
        }
      }
    }
  }
}