'use client'
import { GiphyContextType, ProviderProps } from '@/types'
import React, { useEffect, useState } from 'react'
import GiphyContext from './GiphyContext'
import { toast } from 'sonner'

export const GiphyProvider: React.FC<ProviderProps> = ({ children }) => {
  const [gifData, setGifData] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const fetchSearchGifs = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_GIPHY_API_URL}/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${searchQuery}&limit=6`
    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      setGifData(data.data)
    } catch (error: any) {
      toast.error('Error fetching data from Giphy', {
        description: error.message || 'Something went wrong',
      })
    }
  }

  useEffect(() => {
    fetchSearchGifs()
  }, [])

  const contextValue: GiphyContextType | any = {
    gifData,
    setSearchQuery,
    fetchSearchGifs,
    searchQuery,
  }

  return <GiphyContext.Provider value={contextValue}>{children}</GiphyContext.Provider>
}
