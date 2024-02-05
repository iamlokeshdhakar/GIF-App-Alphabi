'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Singup = () => {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSignup = async (e: any) => {
    e.preventDefault()

    console.log(email, fullName, password, confirmPassword)

    if (password !== confirmPassword) {
      setError('Password do not match')
      toast.error('Password do not match', {
        description: 'Please check your password again',
      })
    } else {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullName, password }),
      })
      const data = await res.json()
      console.log(data)

      router.replace('/')
      toast.success('Account created successfully')
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
      </div>
    </form>
  )
}

export default Singup
