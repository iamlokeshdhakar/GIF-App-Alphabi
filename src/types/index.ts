import { ReactNode } from 'react'

export interface ProviderProps {
  children: ReactNode
}

export interface AuthContextType {
  loading: boolean
  user: any
  setUser: any
  admin: any
  setAdmin: any
  // loginUser: (email: string, password: string) => Promise<any>
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
  gifId: string
}
