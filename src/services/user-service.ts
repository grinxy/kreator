import { setDoc, doc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { FormData, ZoneSelection } from "@/types/registration-form"
import type { UserDocument, UserResponse, Zone } from "@/types/database"
import type { ApiResponse, ApiError } from "@/types/api"

export class UserService {
  private static COLLECTION_NAME = "users"

  static async createUser(formData: FormData, authUid?: string): Promise<ApiResponse<UserResponse>> {
    try {
      console.log("Creating user document with authUid:", authUid)
      console.log("Form data zone:", formData.zone)
      console.log("Referral code received:", formData.referralCode)

      const zone: Zone = this.parseZone(formData.zone)

      const sanitizedRole = "professional"

      const userData: Omit<UserDocument, "id"> = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        street_address: formData.streetAddress,
        postal_code: formData.postalCode,
        city: formData.city,
        province_address: formData.provinceAddress || "",
        country: formData.country,
        profession: formData.profession,
        custom_profession:
          formData.profession === "Otros" && formData.customProfession ? formData.customProfession : null,
        nif_cif: formData.nifCif,
        role: sanitizedRole,
        zone: zone,
        zone_assigned: false,
        interested_in_leadership: formData.interestedInLeadership,
        status: "pending",
        payment_status: "pending",
        auth_uid: authUid,

        ...(formData.referralCode && { referred_by: formData.referralCode }),

        // Registration statuses
        registration_status: "personal_data_completed",
        registration_step: 1,
        registration_started_at: Timestamp.now(),
        step_1_completed_at: Timestamp.now(),
        last_activity_at: Timestamp.now(),

        registration_order: Date.now(),
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      }

      const docRef = doc(db, this.COLLECTION_NAME, authUid!)
      await setDoc(docRef, userData)

      const response: UserResponse = {
        id: docRef.id,
        email: formData.email,
        name: userData.name,
        status: "pending",
        created_at: new Date(),
      }

      return {
        success: true,
        data: response,
      }
    } catch (error: any) {
      console.error("Error creating user document:", error)

      const apiError: ApiError = {
        code: error.code || "USER_CREATION_FAILED",
        message: this.getErrorMessage(error.code) || "Error al crear el usuario",
        details: {
          originalError: error.message,
          errorCode: error.code,
        },
      }

      return {
        success: false,
        error: apiError,
      }
    }
  }

  private static parseZone(zoneSelection: ZoneSelection | null): Zone {
    if (!zoneSelection) {
      return {
        region: "",
        comarca: "",
        province: "",
      }
    }

    return {
      region: zoneSelection.region,
      comarca: zoneSelection.comarca,
      province: zoneSelection.province,
    }
  }

  private static getErrorMessage(errorCode?: string): string {
    const errorMessages: Record<string, string> = {
      "permission-denied": "No tienes permisos para realizar esta acción.",
      unavailable: "Servicio no disponible. Inténtalo más tarde",
      "deadline-exceeded": "Tiempo de espera agotado",
      "already-exists": "Ya existe un usuario con estos datos",
      unauthenticated: "Usuario no autenticado",
    }

    return errorMessages[errorCode || ""] || "Error desconocido"
  }
}
