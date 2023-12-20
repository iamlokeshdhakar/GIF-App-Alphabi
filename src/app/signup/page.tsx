'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Link from 'next/link'

const Singup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = (e: any) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Password do not match')
    }
    console.log('Email:', email)
    console.log('passowrd', password)
    console.log('confirm passowrd', confirmPassword)
  }

  return (
    <form onSubmit={handleSignup}>
      <div className={styles.authContainer}>
        <h1>Create you account </h1>
        <div className={styles.fieldGroup}>
          <input
            type="email"
            className={styles.inputFeild}
            required
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.inputFeild}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className={styles.inputFeild}
            placeholder="Confirm Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.btn}>Signup </button>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.redirectSignup}>
          <p>Already have an account? </p>
          <Link href={'/login'}>Login</Link>
        </div>
      </div>
    </form>
  )
}

export default Singup
