import { ReactNode } from 'react'

export interface AuthProviderProps {
  children: ReactNode
}

export interface AuthContextType {
  registerUser: (email: string, password: string, fullName: string) => Promise<any>
  logOutUser: () => Promise<any>
  loading: boolean
  user: any
  // loginUser: (email: string, password: string) => Promise<>;
}
