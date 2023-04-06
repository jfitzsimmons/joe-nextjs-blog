import React from 'react'
import Link from 'next/link'
import { parseISO } from 'date-fns'
import { PostContent } from '../../types'
import Date from '../../../common/components/Date'
import TagLink from '../../../common/components/TagLink'
import CategoryButton from './CategoryButton'
import { getTag } from '../../../common/utils/tags'
import { getCat } from '../../../common/utils/categories'
import styles from './PostItem.module.css'

type Props = {
  post: PostContent
}

export default function PostItem({ post }: Props) {
  return (
    <>
      <CategoryButton cat={getCat(post.category)} />
      <div className={styles.column}>
        <Date date={parseISO(post.date)} />
        <Link href={`/posts/${post.slug}`}>
          <a>
            <span className={styles.span}>
              <h2 className={styles.h2}>{post.title}</h2>
            </span>
          </a>
        </Link>
        <div className={styles.description}>{post.description}</div>
        <ul className={styles.tag_list}>
          {post.tags.map((it) => (
            <li key={it}>
              <TagLink tag={getTag(it)} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
