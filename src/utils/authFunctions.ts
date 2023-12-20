import { auth } from '@/firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'

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

export const logOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out user:', error)
    throw error
  }
}

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}
