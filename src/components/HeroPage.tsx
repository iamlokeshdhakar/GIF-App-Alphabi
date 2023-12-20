import React from 'react'
import styles from '@/styles/search.module.css'
import SearchBox from './SearchBox'
import GifBox from './GifBox'

const HeroPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SearchBox />
        <div className={styles.resultWrapper}>
          <div className={styles.resultBoxs}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <>
                <GifBox
                  key={item}
                  imgSrc="/a.jpg"
                  iconSrc="/fav-icon.svg"
                  name="Lokesh Dhakar"
                  userName="@lokeshdhakar97"
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default HeroPage
