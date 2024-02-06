'use client'
import { useAuthContext } from '@/context/AuthContext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const TableComp = dynamic(() => import('@/components/DataTable'), { ssr: false })

const AdminPage = () => {
  const { admin } = useAuthContext()
  const [likesdata, setLikesData] = useState([])
  const [dailyStatsData, setDailyStatsData] = useState([])

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

  async function dailyStatsFetcher() {
    const res = await fetch('api/admin/daily-stats', {
      method: 'GET',
    })
    const data = await res.json()
    console.log(data)
    setDailyStatsData(data!)
  }
  useEffect(() => {
    topGifPerf()
    dailyStatsFetcher()
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
        minHeight: '90vh',
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

      <DashboardSectionTemplate heading={' TOP GIF BY LIKES 🩷🩷🩷'}>
        <TableComp likesList={likesdata} tableHeadText={['GIF NAME', 'GIF ID', 'LIKES']} />
      </DashboardSectionTemplate>

      <DashboardSectionTemplate heading={' Daily Stats 🔂🔂🔂'}>
        <TableComp
          dailyStatsData={dailyStatsData}
          tableHeadText={['DATE', 'LIKES', 'REGISTRATION', 'SEARCH']}
        />
      </DashboardSectionTemplate>
    </div>
  )
}

export default AdminPage

const DashboardSectionTemplate = ({ children, heading }: any) => {
  return (
    <div
      style={{
        width: '100%',
        padding: '50px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 4px 100px 0px #cccccc',
        border: '2px solid #cccccc',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 'fit-content',
        }}
      >
        <h4
          style={{
            marginBottom: '30px',
            backgroundColor: '#d9fae2',
            border: '2px solid',
            borderColor: 'green',
            padding: '20px',
            borderRadius: '0px 20px 0px 20px',
          }}
        >
          {heading}
        </h4>

        {children}
      </div>
    </div>
  )
}
