'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  const { loading, user } = useAuthContext()

  if (loading) return <p>Loading...</p>
  if (!loading && !user) {
    router.replace('/login')
  }

  return (
    <div>
      <p>Hello {user?.email}</p>
    </div>
  )
}

export default Home
