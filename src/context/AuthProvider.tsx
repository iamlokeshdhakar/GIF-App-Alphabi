'use client'
import React, { useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'
import { AuthContextType, ProviderProps } from '@/types'

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {}, [])

  const contextValue: AuthContextType = {
    user,
    loading,
    setUser,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
