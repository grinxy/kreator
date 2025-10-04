import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  sendPasswordResetEmail as firebaseSendPasswordReset,
  updateProfile,
  User 
} from 'firebase/auth'
import { auth } from './firebase'
import type { FormData } from '@/types/registration-form'

export interface UserProfile {
  uid: string
  firstName: string
  lastName: string
  email: string
  profession: string
  zone: string
  whatsapp?: string
  role: "professional" | "team-leader"
  interestedInLeadership: boolean
  emailVerified: boolean
  displayName: string
}

export const registerUser = async (formData: FormData): Promise<UserProfile> => {
  if (!formData.email) {
    throw new Error('Email is required for registration')
  }

  try {
    // Generate a temporary password (user will set their own later)
    const tempPassword = generateTempPassword()
    
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      formData.email, 
      tempPassword
    )
    
    const user = userCredential.user

    // Update user's display name
    const displayName = `${formData.firstName} ${formData.lastName}`
    await updateProfile(user, {
      displayName
    })

    // Send email verification
    await sendEmailVerification(user)

    // Return user profile (we'll save to Firestore later)
    const userProfile: UserProfile = {
      uid: user.uid,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      profession: formData.profession,
      zone: formData.zone,
      whatsapp: formData.whatsapp,
      role: formData.role,
      interestedInLeadership: formData.interestedInLeadership,
      emailVerified: false,
      displayName,
    }

    // TODO: Save to Firestore when configured
    console.log('User registered successfully:', userProfile)

    return userProfile
  } catch (error: any) {
    console.error('Registration error details:', error)
    
    // Handle Firebase Auth errors
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este email ya está registrado')
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Formato de email inválido')
    } else if (error.code === 'auth/weak-password') {
      throw new Error('La contraseña debe tener al menos 6 caracteres')
    } else {
      throw new Error(`Error en el registro: ${error.message}`)
    }
  }
}

// Generate a secure temporary password
const generateTempPassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password + 'Aa1!' // Ensure it meets Firebase requirements
}

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  await firebaseSendPasswordReset(auth, email)
}