import React from 'react'
import Link from 'next/link'
import { FilterContent } from '../../../common/types'
import styles from './CategoryButton.module.css'
// background-color: ${(cat.color) ? `rgba(${  cat.color  }.8)` : 'rgba(21, 132, 125, 0.2)'};
// testjpf style thing above again
type Props = {
  cat: FilterContent
}
export default function CategoryButton({ cat }: Props) {
  return (
    <Link
      href="/posts/categories/[[...slug]]"
      as={`/posts/categories/${cat.slug}`}
    >
      <span className={styles.span}>cat.name</span>
    </Link>
  )
}
