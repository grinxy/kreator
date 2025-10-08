import { 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail as firebaseSendPasswordReset,
  updateProfile,
  signInWithEmailAndPassword, 
  signOut
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
  phone?: string
  role: "professional" | "team-leader"
  interestedInLeadership: boolean
  emailVerified: boolean
  displayName: string
}

// Kept this as a backup for future use when we need login and password functionality
// For now, we register users with random generated passwords they don't know.

export const registerUser = async (formData: FormData): Promise<UserProfile> => {
  if (!formData.email) {
    throw new Error('Email is required for registration')
  }

  if (!formData.password) {
    throw new Error('Password is required for registration')
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      formData.email, 
      formData.password  
    )
    
    const user = userCredential.user

  
    const displayName = `${formData.firstName} ${formData.lastName}`
    await updateProfile(user, {
      displayName
    })

    // Return user profile (we'll save to Firestore later)
    const userProfile: UserProfile = {
      uid: user.uid,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      profession: formData.profession,
      zone: formData.zone,
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

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  await firebaseSendPasswordReset(auth, email)
}

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('Usuario no encontrado')
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Contraseña incorrecta')
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Email inválido')
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Demasiados intentos. Intenta más tarde')
    } else {
      throw new Error('Error al iniciar sesión')
    }
  }
}

export const logoutUser = async () => {
  await signOut(auth)
}