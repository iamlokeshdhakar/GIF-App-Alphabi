import Image from 'next/image'
import React, { useState } from 'react'
import styles from '@/styles/search.module.css'
import Link from 'next/link'

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = () => {
    console.log(searchTerm)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchField}>
        <Image src="/search-icon.svg" alt="search-icon" width={'24'} height={'24'} />
        <input
          type="text"
          placeholder="Article or keyword type..."
          className={styles.inputField}
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
      <div className={styles.authLink}>
        <Link href={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <p>Login</p>
        </Link>
        <Link href={'/signup'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <p style={{ backgroundColor: 'black', color: 'white' }}>Signup</p>
        </Link>
      </div>
    </div>
  )
}

export default SearchBox
