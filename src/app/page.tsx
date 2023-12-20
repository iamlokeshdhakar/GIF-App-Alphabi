'use client'
import HeroPage from '@/components/HeroPage'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Home = () => {
  const router = useRouter()
  const { loading, user, logOutUser } = useAuthContext()

  if (loading) return <p>Loading...</p>

  const logoutHandler = () => {
    logOutUser()
    toast.success('Logged out successfully')
    router.replace('/login')
  }

  return <HeroPage />
}

export default Home
