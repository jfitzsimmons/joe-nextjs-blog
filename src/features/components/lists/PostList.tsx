import React from 'react'
import Link from 'next/link'
import { PostContent } from '../../types'
import { FilterContent } from '../../../common/types'
import PostItem from './PostItem'
import TagLink from '../../../common/components/TagLink'
import Pagination from '../../../common/components/Pagination'
import { getCat } from '../../../common/utils/categories'
import orderArrayBy from '../../../utils/arrays'
import styles from './PostList.module.css'

export type Props = {
  posts: PostContent[]
  tags?: FilterContent[]
  filter?: FilterContent
  type?: string
  pagination: {
    current: number
    pages: number
  }
}

export default function PostList({
  posts,
  tags,
  filter,
  type,
  pagination,
}: Props) {
  const orderedTags = tags ? orderArrayBy(tags, ['slug'], ['asc']) : []
  const href = '/posts'
  if (type !== 'all') href.concat(`/filter/${type}`)
  return (
    <div className={`${styles.container}`}>
      <div className={styles.posts}>
        <h1 className={styles.header_large}>
          {type === 'all' && `all posts`}{' '}
          {type !== 'all' && filter.slug !== 'latest' && (
            <>
              {'latest '}
              <Link href={`/posts/filter/${type}/${filter.slug}`}>
                <a>
                  <span
                    className={styles.link}
                    style={{ color: `rgba(${filter.color}.9)` }}
                  >
                    {' /'}
                    {filter.name}
                  </span>
                </a>
              </Link>
            </>
          )}
        </h1>
        <div className={styles.post_list}>
          {posts.map((p) => (
            <div key={p.slug}>
              {filter.slug === 'latest' && (
                <h1 className={styles.header_large}>
                  {filter.name}
                  <Link
                    href={`/posts/filter/categories/${getCat(p.category).slug}`}
                  >
                    <a>
                      <span
                        className={styles.link}
                        style={{
                          color: `rgba(${getCat(p.category).color}.9)`,
                        }}
                      >
                        {' '}
                        /{p.category}
                      </span>
                    </a>
                  </Link>
                </h1>
              )}
              <li className={`card ${styles.li}`}>
                <PostItem post={p} />
              </li>
            </div>
          ))}
        </div>
        {pagination && pagination.pages > 1 && (
          <Pagination
            current={pagination.current}
            pages={pagination.pages}
            link={{
              href: () => `${href}/[[...slug]]`,
              as: (page) => (page === 1 ? `${href}` : `${href}/page/${page}`),
            }}
          />
        )}
      </div>
      {orderedTags && (
        <ul className={`card ${styles.categories}`}>
          {orderedTags.map((t) => (
            <li key={t.slug}>
              <TagLink tag={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

PostList.defaultProps = {
  tags: [],
  filter: { slug: '', name: '' },
  type: 'all',
}
