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

type Props = {
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
  return (
    <div className={`${styles.container}`}>
      <div className={styles.posts}>
        {type !== 'home' && (
          <h1 className={styles.header_large}>
            {type === 'all' ? (
              `all posts`
            ) : (
              <>
                {'latest '}
                <Link href={`/posts/${type}/${filter.slug}`}>
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
        )}
        <div className={styles.post_list}>
          {posts.map((p) => (
            <div key={p.slug}>
              {type === 'home' && (
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
        {pagination && (
          <Pagination
            current={pagination.current}
            pages={pagination.pages}
            link={
              type && type !== 'all'
                ? {
                    href: () => `/posts/${type}/[[...slug]]`,
                    as: (page) =>
                      page === 1
                        ? `/posts/${type}/${filter.slug}`
                        : `/posts/${type}/${filter.slug}/${page}`,
                  }
                : {
                    href: (page) =>
                      page === 1 ? '/posts' : '/posts/page/[page]',
                    as: (page) => (page === 1 ? null : `/posts/page/${page}`),
                  }
            }
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
  filter: '',
  type: 'all',
}
