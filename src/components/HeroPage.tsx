import React from 'react'
import styles from '@/styles/search.module.css'
import SearchBox from './SearchBox'

const HeroPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SearchBox />
      </div>
    </main>
  )
}

export default HeroPage
