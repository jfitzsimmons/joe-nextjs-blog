import React from 'react'
import Link from 'next/link'
import { PostContent } from '../../../lib/posts'
import PostItem from './PostItem'
import TagLink from '../../../common/components/TagLink'
import Pagination from '../../../common/components/Pagination'
import { TagContent, FilterContent } from '../../../common/types'
import { getCat } from '../../../common/utils/categories'
import { orderBy } from '../../../utils/arrays'
import styles from './PostList.module.css'
// testjpf DRY header / LINK ...
type Props = {
  posts: PostContent[]
  tags?: TagContent[]
  // cat?: FilterContent
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
  // cat,
  pagination,
}: Props) {
  const orderedTags = tags ? orderBy(tags, ['slug'], ['asc']) : []
  return (
    <div className={`${styles.container} ${styles.with_posts}`}>
      <div className={styles.posts}>
        {type !== 'home' && (
          <h1 className={styles.header_large}>
            {type === 'all' ? (
              `all posts`
            ) : (
              <>
                {'latest'}{' '}
                <Link href={`/posts/${type}/${filter.slug}`}>
                  <span
                    className={styles.link}
                    style={{ color: `rgba(${filter.color}.9)` }}
                  >
                    {' '}
                    /{filter.name}
                  </span>
                </Link>
              </>
            )}
          </h1>
        )}
        <div className={styles.post_list}>
          {posts.map((it) => (
            <div key={it.slug}>
              {type === 'home' && (
                <h1 className={styles.header_large}>
                  {filter.name}
                  <Link href={`/posts/categories/${getCat(it.category).slug}`}>
                    <span
                      className={styles.link}
                      style={{
                        color: `rgba(${getCat(it.category).color}.9)`,
                      }}
                    >
                      {' '}
                      /{it.category}
                    </span>
                  </Link>
                </h1>
              )}
              <li className={`card ${styles.li}`}>
                <PostItem post={it} />
              </li>
            </div>
          ))}
        </div>
        {pagination && (
          <Pagination
            current={pagination.current}
            pages={pagination.pages}
            link={
              type
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
          {orderedTags.map((it) => (
            <li key={it}>
              <TagLink tag={it} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

PostList.defaultProps = {
  tags: [],
  // cat: "Insincere Engineer",
  filter: 'Insincere Engineer',
  type: 'all',
}
