'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '@/firebase/firebase'
import AuthContext from '@/context/AuthContext'
import { registerUser, logOutUser, loginUser } from '@/utils/authFunctions'
import { AuthContextType, AuthProviderProps } from '@/types'

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userd) => {
      if (userd) {
        setUser(userd)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])

  const contextValue: AuthContextType = {
    registerUser,
    loading,
    logOutUser,
    loginUser,
    user,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
