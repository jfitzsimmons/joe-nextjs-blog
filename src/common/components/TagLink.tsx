import React from 'react'
import Link from 'next/link'
import { TagContent } from '../types'
import styles from './TagLink.module.css'

type Props = {
  tag: TagContent
  type?: string
}
export default function Tag({ tag, type }: Props) {
  const href =
    type && type === 'reference' ? '/posts/field/tags/' : '/posts/tags/'
  return (
    <Link
      href={`${href}[[...slug]]`}
      as={`${href}${tag.slug}`}
    >
      <a className={styles.tag}>{`#${tag.name}`}</a>
    </Link>
  )
}

Tag.defaultProps = {
  type: '',
}
