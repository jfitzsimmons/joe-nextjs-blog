import React from 'react'
import Link from 'next/link'
import { FilterContent } from '../types'
import styles from './TagLink.module.css'

type Props = {
  tag: FilterContent
  type?: string
}
export default function Tag({ tag, type }: Props) {
  const href =
    type && type === 'reference'
      ? '/posts/field/filter/'
      : '/posts/filter/tags/'
  return (
    <Link href={`${href}${tag.slug}`}>
      <a className={styles.tag}>{`#${tag.name}`}</a>
    </Link>
  )
}

Tag.defaultProps = {
  type: '',
}
