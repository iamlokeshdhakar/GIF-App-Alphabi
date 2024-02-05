'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuthContext()
  const router = useRouter()

  const handleLoginWithEmailAndPassword = async () => {
    try {
      const user = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!user.ok) {
        throw new Error('Invalid Information')
      }

      const data = await user.json()
      document.cookie = `next-auth.session-token=${data.jsonToken}; path=/; max-age=60; samesite=lax; secure`
      setUser(data.user)
      router.replace('/')
      toast.success('Logged in successfully')
    } catch (error: any) {
      toast.error('Invalid Information', {
        description: error.message ? error.message : 'Something went wrong',
      })
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
      <button className={styles.btn} onClick={handleLoginWithEmailAndPassword}>
        Login
      </button>
    </div>
  )
}

export default Login
