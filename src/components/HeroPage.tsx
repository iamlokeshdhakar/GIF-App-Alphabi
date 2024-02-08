'use client'
import React, { useState } from 'react'
import styles from '@/styles/search.module.css'
import SearchBox from './SearchBox'
import GifBox from './GifBox'
import Pagination from './Pagination'
import { useGiphyContext } from '@/context/GiphyContext'
import { toast } from 'sonner'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { redirect } from 'next/navigation'

const HeroPage = () => {
  const { admin, user } = useAuthContext()

  const { gifData, trending, searchQuery } = useGiphyContext()
  const displayData = gifData?.length > 0 ? gifData : trending

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostPerPage] = useState(6)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage

  const entries = displayData.slice(firstPostIndex, lastPostIndex)

  if (admin) {
    redirect('/admin')
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SearchBox />
        <div className={styles.resultWrapper}>
          {entries?.length > 0 && (
            <div className={styles.trenDiv}>
              <h1> {searchQuery || 'Trending GIF'}</h1>
            </div>
          )}
          <div className={styles.resultBoxs}>
            {entries?.map((gif: any) => (
              <>
                <GifBox
                  key={gif.id}
                  gifId={gif.id}
                  imgSrc={gif.images.original.url}
                  iconSrc="/fav-icon.svg"
                  name={gif?.user?.display_name || 'Unknown'}
                  userName={gif.username || 'Unknown'}
                />
              </>
            ))}
          </div>
          {entries?.length > 0 && (
            <Pagination
              totalPosts={displayData.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>

      {!user && (
        <div
          style={{
            width: '100%',
            height: '80px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            borderRadius: '10px',
            border: '2px solid darkgrey ',
          }}
        >
          <Link href={'/admin/login'} style={{ textDecoration: 'none', color: 'black' }}>
            Are you an Admin,
            <span
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '8px 16px',
                marginLeft: '10px',
                borderRadius: '50px',
              }}
            >
              Login Here
            </span>
          </Link>
        </div>
      )}
    </main>
  )
}

export default HeroPage
