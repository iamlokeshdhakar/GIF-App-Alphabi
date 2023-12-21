'use client'

import { GiphyContextType } from '@/types'
import { createContext, useContext } from 'react'

const GiphyContext = createContext<GiphyContextType | undefined>(undefined)

export const useGiphyContext = (): GiphyContextType => {
  const context = useContext(GiphyContext)
  if (!context) {
    throw new Error('useGiphyContext must be used within an GiphyProvider')
  }
  return context
}

export default GiphyContext
