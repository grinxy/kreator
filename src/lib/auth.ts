import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "./firebase"
import type { FormData } from "@/types/registration-form"

export interface UserProfile {
  uid: string
  firstName: string
  lastName: string
  email: string
  phone: string
  profession: string
  zone: string
  role: "professional" | "team-leader"
  interestedInLeadership: boolean
  emailVerified: boolean
  displayName: string
}

export const registerUser = async (formData: FormData): Promise<UserProfile> => {
  if (!formData.email) {
    throw new Error("Email is required for registration")
  }

  if (!formData.phone) {
    throw new Error("Phone is required for registration")
  }

  try {
    // Generate a secure temporary password (user won't know this)
    const tempPassword = generateSecurePassword()

    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, tempPassword)

    const user = userCredential.user

    const displayName = `${formData.firstName} ${formData.lastName}`
    await updateProfile(user, {
      displayName,
    })

    const userProfile: UserProfile = {
      uid: user.uid,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      profession: formData.profession,
      zone: formData.zone,
      role: formData.role,
      interestedInLeadership: formData.interestedInLeadership,
      emailVerified: false,
      displayName,
    }
    console.log("User registered successfully:", userProfile)

    return userProfile
  } catch (error: any) {
    console.error("Registration error details:", error)

    if (error.code === "auth/email-already-in-use") {
      throw new Error("Este email ya está registrado")
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Formato de email inválido")
    } else if (error.code === "auth/weak-password") {
      throw new Error("Error interno de validación")
    } else {
      throw new Error(`Error en el registro: ${error.message}`)
    }
  }
}

const generateSecurePassword = (): string => {
  const length = 16
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
  let password = ""

  // Ensure password meets Firebase requirements
  password += "A"
  password += "a"
  password += "1"
  password += "!"

  for (let i = 4; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}
