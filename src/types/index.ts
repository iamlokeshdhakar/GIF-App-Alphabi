import { ReactNode } from 'react'

export interface ProviderProps {
  children: ReactNode
}

export interface AuthContextType {
  registerUser: (email: string, password: string, fullName: string) => Promise<any>
  logOutUser: () => Promise<any>
  loading: boolean
  user: any
  loginUser: (email: string, password: string) => Promise<any>
  authWithGoogle: () => Promise<any>
}

export interface GiphyContextType {
  gifData: any
  setSearchQuery: any
  fetchSearchGifs: any
  searchQuery: any
  trending: any
  loading: any
}

export interface GifBoxProps {
  imgSrc: string
  name: string
  userName: string
  iconSrc: string
}
