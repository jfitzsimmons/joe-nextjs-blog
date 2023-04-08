import React from 'react'
import Link from 'next/link'
import generatePagination from '../utils/pagination'
import styles from './Pagination.module.css'
import { Pagination } from '../types'

type Props = {
  current: number
  pages: number
  link: {
    href: (number) => string
    as: (number) => string
  }
}
export default function PaginationComponent({ current, pages, link }: Props) {
  const pagination = generatePagination(current, pages)
  return (
    <ul className={styles.paging}>
      {pagination.map((it: Pagination) => (
        <li
          key={it.page}
          className={styles.paging__number}
        >
          {it.excerpt ? (
            '...'
          ) : (
            <Link
              href={link.href(it.page)}
              //  as={link.as(it.page)}
            >
              <a className={it.page === current ? styles.active : null}>
                {it.page}
              </a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
