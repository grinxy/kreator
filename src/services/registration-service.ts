import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { FormData } from "@/types/registration-form"
import type { ApiResponse, RegistrationResponse, ApiError } from "@/types/api"

export class RegistrationService {
  private static COLLECTION_NAME = "registrations"

  static async createRegistration(formData: FormData): Promise<ApiResponse<RegistrationResponse>> {
    try {
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,

        // Occupation and customised variant ("Other")
        profession: formData.profession,
        customProfession:
          formData.profession === "Otros" && formData.customProfession ? formData.customProfession : null,

        // Area and role
        zone: formData.zone,
        zoneAssigned: false,
        role: "professional",
        interested_in_leadership: formData.interestedInLeadership,

        // === REFERRAL (Fase 1) ===
        referred_by: formData.referralCode || null,

        // Overall global validation status
        status: "pending" as const,

        // Specific role validation status
        roleApproval: "pending" as const,

        acceptTerms: formData.acceptTerms,

        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), registrationData)

      return {
        success: true,
        data: {
          id: docRef.id,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          status: "pending",
          createdAt: new Date(),
        },
      }
    } catch (error: any) {
      console.error("Error creating registration:", error)

      return {
        success: false,
        error: {
          code: error.code || "REGISTRATION_FAILED",
          message: error.message || "Error al procesar el registro",
        },
      }
    }
  }
}
