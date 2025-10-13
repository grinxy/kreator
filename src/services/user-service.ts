import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { FormData } from "@/types/registration-form"
import type { UserDocument, UserResponse, Zone } from "@/types/database"
import type { ApiResponse, ApiError } from "@/types/api"

export class UserService {
  private static COLLECTION_NAME = "users"

  static async createUser(formData: FormData, authUid?: string): Promise<ApiResponse<UserResponse>> {
    try {
      console.log("Creating user document with authUid:", authUid)

      const zone: Zone = this.parseZone(formData.zone)

      const userData: Omit<UserDocument, "id"> = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        role: formData.role === "team-leader" ? "team_leader" : "professional",
        zone: zone,
        interested_in_leadership: formData.interestedInLeadership,
        accept_terms: formData.acceptTerms,
        status: "pending",
        auth_uid: authUid,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      }

      console.log("User data to be saved:", userData)

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), userData)

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

  private static parseZone(zoneString: string): Zone {
    return {
      city: zoneString,
      province: zoneString,
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
