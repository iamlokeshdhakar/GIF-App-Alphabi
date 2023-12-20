'use client'

import { AuthContextType } from '@/types'
import { createContext, useContext } from 'react'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
