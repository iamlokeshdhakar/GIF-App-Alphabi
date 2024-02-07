'use client'

import { useAuthContext } from '@/context/AuthContext'
import { toast } from 'sonner'

const Loading = () => {
  const { loading } = useAuthContext()
  if (loading) {
    toast.loading('Loading', { duration: 1000 })
  }
  return <></>
}

export default Loading
