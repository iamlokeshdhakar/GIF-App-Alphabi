'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '@/styles/search.module.css'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useGiphyContext } from '@/context/GiphyContext'

const SearchBox: React.FC = () => {
  const { user, logOutUser } = useAuthContext()
  const router = useRouter()

  const { searchQuery, setSearchQuery, fetchSearchGifs } = useGiphyContext()

  const handleSearch = () => {
    fetchSearchGifs()
  }

  const logoutHandler = () => {
    logOutUser()
    toast.success('Logged out successfully')
    router.replace('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchField}>
        <Image src="/search-icon.svg" alt="search-icon" width={'24'} height={'24'} />
        <input
          type="text"
          placeholder="Article or keyword type..."
          className={styles.inputField}
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
      {!user && (
        <div className={styles.authLink}>
          <Link href={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <p>Login</p>
          </Link>
          <Link href={'/signup'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <p style={{ backgroundColor: 'black', color: 'white' }}>Signup</p>
          </Link>
        </div>
      )}
      {user && (
        <div className={styles.authLink}>
          <p>
            <Image src="/fav-icon.svg" alt="fac-icon" width={'18'} height={'18'} />
            Favorite
          </p>
          <p style={{ backgroundColor: 'black', color: 'white' }} onClick={logoutHandler}>
            Logout
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchBox
