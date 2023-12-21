import React from 'react'
import styles from '@/styles/search.module.css'

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }: any) => {
  const pageArr: number[] = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageArr.push(i)
  }

  return (
    <div className={styles.paginationBox}>
      <>
        {pageArr.map((page, index) => {
          return (
            <>
              <div
                key={index}
                className={page == currentPage ? styles.activePage : styles.pageNumberBox}
                onClick={() => {
                  setCurrentPage(page)
                }}
              >
                <span>{page}</span>
              </div>
            </>
          )
        })}
      </>
    </div>
  )
}

export default Pagination
