import React from 'react'
import Link from 'next/link'
import { TagContent } from '../types'
import styles from './TagButton.module.css'

type Props = {
  tag: TagContent
}
export default function TagButton({ tag }: Props) {
  return (
    <Link
      href="/posts/tags/[[...slug]]"
      as={`/posts/tags/${tag.slug}`}
    >
      <a
        className={styles.tag}
        href="/posts/tags/[[...slug]]"
      >
        #{tag.name}
      </a>
    </Link>
  )
}
