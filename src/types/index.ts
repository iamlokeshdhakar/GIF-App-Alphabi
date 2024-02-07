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
  setLoading: any
}

export interface GiphyContextType {
  gifData: any
  setSearchQuery: any
  fetchSearchGifs: any
  searchQuery: any
  trending: any
}

export interface GifBoxProps {
  imgSrc: string
  name: string
  userName: string
  iconSrc: string
  gifId: string
}
