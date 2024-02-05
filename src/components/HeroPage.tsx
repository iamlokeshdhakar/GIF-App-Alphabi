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
  const { admin } = useAuthContext()
  const { gifData, trending, searchQuery, loading } = useGiphyContext()
  const displayData = gifData.length > 0 ? gifData : trending

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostPerPage] = useState(6)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage

  const entries = displayData.slice(firstPostIndex, lastPostIndex)

  if (loading) {
    toast.loading('Loading...')
  }

  if (admin) {
    redirect('/admin')
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SearchBox />
        <div className={styles.resultWrapper}>
          {entries.length > 0 && (
            <div className={styles.trenDiv}>
              <h1> {searchQuery || 'Trending GIF'}</h1>
            </div>
          )}
          <div className={styles.resultBoxs}>
            {entries?.map((gif: any) => (
              <>
                <GifBox
                  key={gif.id}
                  imgSrc={gif.images.original.url}
                  iconSrc="/fav-icon.svg"
                  name={gif?.user?.display_name || 'Unknown'}
                  userName={gif.username || 'Unknown'}
                />
              </>
            ))}
          </div>
          {entries.length > 0 && (
            <Pagination
              totalPosts={displayData.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
      <Link href={'/admin/login'}>Admin Login</Link>
    </main>
  )
}

export default HeroPage
