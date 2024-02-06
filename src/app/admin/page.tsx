'use client'
import { useAuthContext } from '@/context/AuthContext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const GifTableComp = dynamic(() => import('@/components/GifTable'), { ssr: false })

const AdminPage = () => {
  const { admin } = useAuthContext()
  const [likesdata, setLikesData] = useState([])
  async function topGifPerf() {
    const res = await fetch('api/admin/top', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    setLikesData(data)
  }

  useEffect(() => {
    topGifPerf()
  }, [])

  // if (!admin)
  //   return (
  //     <div>
  //       Not authorized
  //       <br />
  //       <Link href={'/admin/login'}>Go to admin login page</Link>
  //     </div>
  //   )

  return (
    <div
      style={{
        width: '100%',
        height: '90vh',
        padding: '10px 30px',
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        backgroundColor: '#ebebeb',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'inherit',
            width: '100%',
            backgroundColor: 'white',
            padding: '20px 10px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0px 4px 100px 0px #cccccc',
            border: '2px solid #cccccc',
          }}
        >
          Admin Dashboard
        </h2>
      </div>

      <GifTableComp likesList={likesdata} />
    </div>
  )
}

export default AdminPage
