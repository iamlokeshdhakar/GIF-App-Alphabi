'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const Singup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { loading, registerUser } = useAuthContext()
  const router = useRouter()
  const handleSignup = async (e: any) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Password do not match')
    } else {
      await registerUser(email, password, 'test')
      router.replace('/')
    }
    console.log('Email:', email)
    console.log('passowrd', password)
    console.log('confirm passowrd', confirmPassword)
  }

  return (
    <form onSubmit={handleSignup}>
      <div className={styles.authContainer}>
        <h1>Create your account </h1>
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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
