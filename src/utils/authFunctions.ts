import { auth } from '@/firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const registerUser = async (email: string, password: string, fullName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const createdUser = userCredential.user
    await updateProfile(createdUser, { displayName: fullName })
    return createdUser
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}
