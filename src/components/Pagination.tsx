import React from 'react'
import styles from '@/styles/search.module.css'

const Pagination = () => {
  return (
    <div className={styles.paginationBox}>
      <div className={styles.def}>
        <span>Previous</span>
      </div>
      <div className={styles.pageNumberBox}>
        <span>1</span>
      </div>
      <div className={styles.pageNumberBox}>
        <span>2</span>
      </div>
      <div className={styles.pageNumberBox}>
        <span>3</span>
      </div>
      <div className={styles.def}>
        <span>Next</span>
      </div>
    </div>
  )
}

export default Pagination
