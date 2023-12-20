'use client'
import React, { createContext, useContext, ReactNode } from 'react'

interface AuthContextType {
  user: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authValues: AuthContextType = {
    user: 'lokesh',
  }

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
}
