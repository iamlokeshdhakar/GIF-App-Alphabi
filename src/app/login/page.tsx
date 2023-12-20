'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser, authWithGoogle } = useAuthContext()
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await loginUser(email, password)
      router.replace('/')
    } catch (error) {
      console.log(error)
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
    <div className={styles.authContainer}>
      <h1>Login </h1>
      <div className={styles.fieldGroup}>
        <input
          type="email"
          className={styles.inputFeild}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={styles.inputFeild}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.redirectSignup}>
          <p>Do not have account? </p>
          <Link href={'/signup'}>Signup</Link>
        </div>
      </div>
      <button className={styles.btn} onClick={handleLogin}>
        Login
      </button>
      <div className={styles.seprate}>
        <p>OR</p>
      </div>

      <button className={styles.secBtn} onClick={authWithGoogleHandler}>
        Login with Google
      </button>
    </div>
  )
}

export default Login
