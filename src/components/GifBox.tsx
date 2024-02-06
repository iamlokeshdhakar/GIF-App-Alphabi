'use client'
import React, { useState } from 'react'
import styles from '@/styles/search.module.css'
import Image from 'next/image'
import { GifBoxProps } from '@/types'
import { toast } from 'sonner'
import { useAuthContext } from '@/context/AuthContext'

const GifBox: React.FC<GifBoxProps> = ({
  imgSrc = '/a.jpg',
  iconSrc = '/fav-icon.svg',
  name,
  gifId,
  userName,
}) => {
  const { user } = useAuthContext()

  const gifLikedHandler = async () => {
    const payload: any = {
      gifId,
      url: imgSrc,
      likeBy: user._id,
      gifName: name,
    }

    const data = await fetch('/api/gif', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const res = await data.json()
    console.log(res)

    if (res) {
      toast.success(res.message)
    }
  }

  return (
    <div className={styles.giphyBox}>
      <div className={styles.imgBox}>
        <Image
          priority
          src={imgSrc}
          alt="gif"
          fill
          sizes="100%"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={styles.detailsBox}>
        <div className={styles.userDetail}>
          <p className={styles.cntName}>{name}</p>
          <span className={styles.cntUsername}>{userName}</span>
        </div>
        <div className={styles.favIcon} onClick={gifLikedHandler}>
          <Image src={iconSrc} alt="star-icon" width={24} height={24} />
        </div>
      </div>
    </div>
  )
}

export default GifBox
