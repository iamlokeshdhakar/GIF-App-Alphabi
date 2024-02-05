'use client'
import GifTable from '@/components/GifTable'
import { useAuthContext } from '@/context/AuthContext'
import Link from 'next/link'

const AdminPage = () => {
  const { admin } = useAuthContext()

  // if (!admin)
  //   return (
  //     <div>
  //       Not authorized
  //       <br />
  //       <Link href={'/admin/login'}>Go to admin login page</Link>
  //     </div>
  //   )

  return (
    <div>
      <GifTable />
    </div>
  )
}

export default AdminPage
