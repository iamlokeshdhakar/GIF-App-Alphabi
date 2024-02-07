import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import React from 'react'
import { AuthProvider } from '@/context/AuthProvider'
import { Toaster, toast } from 'sonner'
import { GiphyProvider } from '@/context/GiphyProvider'
import { useAuthContext } from '@/context/AuthContext'
import Loading from '@/components/Loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alpha BI | Lokesh Dhakar',
  description: 'AlphaBI full stack developer assignment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GiphyProvider>
            <Loading />
            <main className="main">{children}</main>
          </GiphyProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
