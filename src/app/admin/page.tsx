'use client'
import { useAuthContext } from '@/context/AuthContext'
import Link from 'next/link'

const AdminPage = () => {
  const { admin } = useAuthContext()

  if (!admin)
    return (
      <div>
        Not authorized
        <br />
        <Link href={'/admin/login'}>Go to admin login page</Link>
      </div>
    )

  return <div>AdminPage</div>
}

export default AdminPage
