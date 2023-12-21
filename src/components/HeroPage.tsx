'use client'
import React from 'react'
import styles from '@/styles/search.module.css'
import SearchBox from './SearchBox'
import GifBox from './GifBox'
import Pagination from './Pagination'
import { useGiphyContext } from '@/context/GiphyContext'

const HeroPage = () => {
  const { gifData } = useGiphyContext()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SearchBox />
        <div className={styles.resultWrapper}>
          <div className={styles.resultBoxs}>
            {gifData?.map((gif: any) => (
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
          {gifData.length > 0 && <Pagination />}
        </div>
      </div>
    </main>
  )
}

export default HeroPage
