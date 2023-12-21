'use client'

import { GiphyContextType } from '@/types'
import { createContext, useContext } from 'react'
import { toast } from 'sonner'

const GiphyContext = createContext<GiphyContextType | undefined>(undefined)

export const useGiphyContext = (): GiphyContextType => {
  const context = useContext(GiphyContext)
  if (!context) {
    toast.error('useGiphyContext must be used within an GiphyProvider')
    throw new Error('useGiphyContext must be used within an GiphyProvider')
  }
  return context
}

export default GiphyContext
