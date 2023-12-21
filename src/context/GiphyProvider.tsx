'use client'
import { GiphyContextType, ProviderProps } from '@/types'
import React, { useEffect, useState } from 'react'
import GiphyContext from './GiphyContext'

export const GiphyProvider: React.FC<ProviderProps> = ({ children }) => {
  const [giphyData, setGiphyData] = useState([])

  useEffect(() => {}, [])

  const contextValue: GiphyContextType = {
    giphyData,
  }

  return <GiphyContext.Provider value={contextValue}>{children}</GiphyContext.Provider>
}
