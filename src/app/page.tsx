'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  const { loading, user, logOutUser } = useAuthContext()

  if (loading) return <p>Loading...</p>
  if (!loading && !user) {
    router.replace('/login')
  }

  const logoutHandler = () => {
    logOutUser()
    router.replace('/login')
  }

  return (
    <div>
      <p>Hello {user?.email}</p>
      <button onClick={logoutHandler}>logout</button>
    </div>
  )
}

export default Home
