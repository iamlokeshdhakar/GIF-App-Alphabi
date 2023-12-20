'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const Singup = () => {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { registerUser, authWithGoogle } = useAuthContext()
  const router = useRouter()
  const handleSignup = async (e: any) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Password do not match')
    } else {
      await registerUser(email, password, fullName)
      router.replace('/')
    }
  }

  const authWithGoogleHandler = async () => {
    try {
      await authWithGoogle()
      router.replace('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSignup}>
      <div className={styles.authContainer}>
        <h1>Create your account </h1>
        <div className={styles.fieldGroup}>
          <input
            type="text"
            className={styles.inputFeild}
            required
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
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
        <div className={styles.seprate}>
          <p>OR</p>
        </div>
        <button className={styles.secBtn} onClick={authWithGoogleHandler}>
          Signup with Google
        </button>
      </div>
    </form>
  )
}

export default Singup
