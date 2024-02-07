'use client'
import React, { useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'
import { AuthContextType, ProviderProps } from '@/types'
import { getToken } from 'next-auth/jwt'

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {}, [])

  const contextValue: AuthContextType = {
    user,
    loading,
    setLoading,
    setUser,
    setAdmin,
    admin,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
