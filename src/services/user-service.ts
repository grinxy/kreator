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

      const zone: Zone = this.parseZone(formData.zone)
      console.log("Parsed zone:", zone)

      // Temporary safeguard in case older versions send "team-leader"
      const sanitizedRole = "professional"

      const userData: Omit<UserDocument, "id"> = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        custom_profession:
          formData.profession === "Otros" && formData.customProfession ? formData.customProfession : null,
        nif_cif: formData.nifCif,
        role: sanitizedRole, // professional
        zone: zone,
        zone_assigned: false, // Not assigned yet
        interested_in_leadership: formData.interestedInLeadership,
        status: "pending", // pending all registrations
        payment_status: "pending",
        auth_uid: authUid,

        // (Registration statuses)
        registration_status: "personal_data_completed",
        registration_step: 1,
        registration_started_at: Timestamp.now(),
        step_1_completed_at: Timestamp.now(),
        last_activity_at: Timestamp.now(),
        abandoned: false,

        registration_order: Date.now(),
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      }

      console.log("User data to be saved:", userData)

      const docRef = doc(db, this.COLLECTION_NAME, authUid!)
      await setDoc(docRef, userData)

      console.log("Firestore document created with ID:", docRef.id)

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
      console.error("Error code:", error.code)
      console.error("Error message:", error.message)

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
      "permission-denied": "No tienes permisos para realizar esta acción. Verifica las reglas de Firestore.",
      unavailable: "Servicio no disponible. Inténtalo más tarde",
      "deadline-exceeded": "Tiempo de espera agotado. Inténtalo de nuevo",
      "already-exists": "Ya existe un usuario con estos datos",
      unauthenticated: "Usuario no autenticado",
    }

    return errorMessages[errorCode || ""] || "Error desconocido"
  }
}
