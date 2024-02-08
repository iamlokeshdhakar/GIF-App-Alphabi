'use client'
import ChartComp from '@/components/ChartComp'
import StackedBar from '@/components/StackedBar'
import { useAuthContext } from '@/context/AuthContext'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import LineChartComp from '@/components/LineChartComp'
import Link from 'next/link'
const TableComp = dynamic(() => import('@/components/DataTable'), { ssr: false })

const AdminPage = () => {
  const { admin, setLoading } = useAuthContext()
  const [likesdata, setLikesData] = useState([])
  const [dailyStatsData, setDailyStatsData] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [aggregationLevel, setAggregationLevel] = useState('')
  const [mostActiveUserData, setMostActiveUserData] = useState([])
  const [dailChart, setDailyChart] = useState<boolean>(true)
  const [activeChart, setActiveChart] = useState<boolean>(true)
  const [topGifChart, setTopGifChart] = useState<boolean>(true)

  function startDateHandler(e: any) {
    setStartDate(e.target.value)
  }

  function endDateHandler(e: any) {
    setEndDate(e.target.value)
  }

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

  async function dailyStatsFetcher(aggregationLevel = '') {
    const res = await fetch(
      `api/admin/daily-stats?startDate=${startDate}&endDate=${endDate}&aggregationLevel=${aggregationLevel}`,
      {
        method: 'GET',
      },
    )
    const data = await res.json()
    setDailyStatsData(data!)
  }

  async function mostActiveUsers() {
    const res = await fetch('api/admin/most-active-user', {
      method: 'GET',
    })
    const data = await res.json()
    setMostActiveUserData(data)
  }

  useEffect(() => {
    topGifPerf()
    dailyStatsFetcher()
    mostActiveUsers()
  }, [])

  if (!admin)
    return (
      <div>
        Not authorized
        <br />
        <Link href={'/admin/login'}>Go to admin login page</Link>
      </div>
    )

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

      <DashboardSectionTemplate heading={' Daily Stats 🔂🔂🔂'}>
        <div
          style={{
            width: '100%',
            height: '60px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button
            style={{
              height: '100%',
              padding: '0px 50px',
              borderRadius: '10px',
              border: '3px solid lightgreen',
              outline: '3px solid black',
              color: 'white',
              cursor: 'pointer',
              marginRight: '20px',
              fontSize: '16px',
              fontFamily: 'monospace',
              backgroundColor: 'black',
            }}
            onClick={() => setDailyChart(!dailChart)}
          >
            {' '}
            Enable
            {dailChart ? ' Table View 📋' : ' Chart View 📊'}
          </button>

          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                padding: '3px 18px',
                borderRadius: '50px',
                backgroundColor: '#f7f7f7',
                border: '1px solid darkgrey',
                cursor: 'pointer',
              }}
              onClick={() => dailyStatsFetcher()}
            >
              Daily
            </span>
            <span
              style={{
                padding: '3px 18px',
                borderRadius: '50px',
                backgroundColor: '#f7f7f7',
                border: '1px solid darkgrey',
                cursor: 'pointer',
              }}
              onClick={() => dailyStatsFetcher('weekly')}
            >
              Weekly
            </span>
            <span
              style={{
                padding: '3px 18px',
                borderRadius: '50px',
                backgroundColor: '#f7f7f7',
                border: '1px solid darkgrey',
                cursor: 'pointer',
              }}
              onClick={() => dailyStatsFetcher('monthly')}
            >
              Monthly
            </span>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: '50px',
            marginBottom: '20px',
            display: 'flex',
            gap: '30px',
          }}
        >
          <div
            style={{
              backgroundColor: 'black',
              width: 'fit-content',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              gap: '10px',
              paddingLeft: '40px',
              borderRadius: '50px',
            }}
          >
            <span style={{ fontWeight: '500', paddingRight: '10px' }}> From: </span>
            <input
              type="date"
              onChange={(e) => startDateHandler(e)}
              style={{
                padding: '6px 30px',
                height: '100%',
                outline: 'none',
                border: '3px solid black',
                borderRadius: '50px',
                cursor: 'pointer',
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: 'black',
              width: 'fit-content',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              gap: '10px',
              paddingLeft: '40px',
              borderRadius: '50px',
            }}
          >
            <span style={{ fontWeight: '500', paddingRight: '10px' }}> To: </span>
            <input
              type="date"
              onChange={(e) => endDateHandler(e)}
              style={{
                padding: '6px 30px',
                height: '100%',
                outline: 'none',
                border: '3px solid black',
                borderRadius: '50px',
                cursor: 'pointer',
              }}
            />
          </div>

          <button
            style={{
              height: '100%',
              padding: '0px 50px',
              borderRadius: '50px',
              border: '2px solid grey',
              backgroundColor: 'black',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={() => dailyStatsFetcher()}
          >
            Filter
          </button>
        </div>

        {dailChart ? (
          <ChartComp data={dailyStatsData} />
        ) : (
          <TableComp
            dailyStatsData={dailyStatsData}
            tableHeadText={['DATE', 'LIKES', 'REGISTRATION', 'SEARCH']}
          />
        )}
      </DashboardSectionTemplate>

      <DashboardSectionTemplate heading={' TOP GIF BY LIKES 🩷🩷🩷'}>
        <div style={{ width: '100%', height: '60px', marginBottom: '20px' }}>
          <button
            style={{
              height: '100%',
              padding: '0px 50px',
              borderRadius: '10px',
              border: '3px solid lightgreen',
              outline: '3px solid black',
              color: 'white',
              cursor: 'pointer',
              marginRight: '20px',
              fontSize: '16px',
              fontFamily: 'monospace',
              backgroundColor: 'black',
            }}
            onClick={() => setTopGifChart(!topGifChart)}
          >
            Enable
            {dailChart ? ' Table View 📋' : ' Chart View 📊'}
          </button>
        </div>
        {topGifChart ? (
          <LineChartComp data={likesdata} />
        ) : (
          <TableComp likesList={likesdata} tableHeadText={['GIF NAME', 'GIF ID', 'LIKES']} />
        )}
      </DashboardSectionTemplate>

      <DashboardSectionTemplate heading={' MOST ACTIVE USERS 👦🏻👩🏻'}>
        <div style={{ width: '100%', height: '60px', marginBottom: '20px' }}>
          <button
            style={{
              height: '100%',
              padding: '0px 50px',
              borderRadius: '10px',
              border: '3px solid lightgreen',
              outline: '3px solid black',
              color: 'white',
              cursor: 'pointer',
              marginRight: '20px',
              fontSize: '16px',
              fontFamily: 'monospace',
              backgroundColor: 'black',
            }}
            onClick={() => setActiveChart(!activeChart)}
          >
            Enable
            {dailChart ? ' Table View 📋' : ' Chart View 📊'}
          </button>
        </div>

        {activeChart ? (
          <StackedBar mostActiveUsers={mostActiveUserData} />
        ) : (
          <TableComp
            mostActiveUsers={mostActiveUserData}
            tableHeadText={['USER NAME', 'SEARCH', 'LIKED']}
          />
        )}
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
