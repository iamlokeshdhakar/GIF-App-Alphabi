'use client'
import { useAuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Card = () => {
  const [likedGifs, setLikedGifs] = useState()

  useEffect(() => {
    // fetch gif which  has name user id

    const fetchGifs = async () => {
      const data = await fetch('/api/gif')
      const res = await data.json()
      console.log(res, 'res')
      setLikedGifs(res)
    }
    console.log(likedGifs)
  }, [])

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
        {[1, 2, 3, 4, 5, 5].map((item, k) => {
          return (
            <div style={styles.card} key={k}>
              <Image
                src="https://placekitten.com/300/200"
                alt="Card Image"
                width={300}
                height={200}
              />
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
