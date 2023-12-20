'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Link from 'next/link'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Add your login logic here
    console.log('Email:', email)
    console.log('Password:', password)
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
    </div>
  )
}

export default Login
