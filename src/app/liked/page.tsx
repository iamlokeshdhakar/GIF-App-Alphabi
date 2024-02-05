'use client'
import { useAuthContext } from '@/context/AuthContext'
import { set } from 'mongoose'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Card = () => {
  const { user } = useAuthContext()
  const [data, setData] = useState([])

  async function likeGifs() {
    const res = await fetch(`/api/gif?userId=${user._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    setData(data)
  }

  useEffect(() => {
    likeGifs()
  }, [])

  console.log(data, 'data')

  return (
    <section>
      <Link href={'/'}>
        <h3
          style={{
            padding: '20px',
            display: 'flex',
            width: '120px',
            textAlign: 'center',
          }}
        >
          Back
        </h3>
      </Link>
      <div style={styles.cardWrapper}>
        {data.map((item: any, k) => {
          return (
            <div style={styles.card} key={k}>
              <Image src={item.url} alt="Card Image" width={300} height={200} />
              <div
                style={{
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: 'black',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Remove
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const styles: any = {
  cardWrapper: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    overflow: 'hidden',
    flexShrink: 0,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '200px',
    display: 'block',
  },
}

export default Card
