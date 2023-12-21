'use client'
import React from 'react'
import styles from '@/styles/search.module.css'
import SearchBox from './SearchBox'
import GifBox from './GifBox'
import Pagination from './Pagination'
import { useGiphyContext } from '@/context/GiphyContext'

const HeroPage = () => {
  const { gifData, trending, searchQuery } = useGiphyContext()
  const displayData = gifData.length > 0 ? gifData : trending

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SearchBox />
        <div className={styles.resultWrapper}>
          {displayData.length > 0 && (
            <div className={styles.trenDiv}>
              <h1> {searchQuery || 'Trending GIF'}</h1>
            </div>
          )}
          <div className={styles.resultBoxs}>
            {displayData?.map((gif: any) => (
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
          {displayData.length > 0 && <Pagination />}
        </div>
      </div>
    </main>
  )
}

export default HeroPage
