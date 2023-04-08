import React from 'react'
import Link from 'next/link'
import { FilterContent } from '../types'
import styles from './TagButton.module.css'

type Props = {
  tag: FilterContent
}
export default function TagButton({ tag }: Props) {
  return (
    <Link href={`/posts/filter/tags/${tag.slug}`}>
      <a className={styles.tag}>#{tag.name}</a>
    </Link>
  )
}
