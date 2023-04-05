import React from 'react'
import { PostContent } from '../../../lib/posts'
import PostItem from './PostItem'
import TagLink from '../../../common/components/TagLink'
import Pagination from '../../../common/components/Pagination'
import { TagContent } from '../../../common/utils/tags'
import { FilterContent, getCat } from '../../../common/utils/categories'
import { orderBy } from '../../../utils/arrays'
import Link from 'next/link'

type Props = {
  posts: PostContent[]
  tags?: TagContent[]
  cat?: FilterContent
  filter?: FilterContent
  type?: string
  pagination?: {
    current: number
    pages: number
  }
}

export default function PostList({
  posts,
  tags,
  filter,
  type,
  cat,
  pagination,
}: Props) {
  if (tags) tags = orderBy(tags, ['slug'], ['asc'])
  return (
    <div className={'container with-posts'}>
      <div className={'posts'}>
        {type !== 'home' && (
          <h1>
            {!type ? (
              `all posts`
            ) : (
              <>
                {'latest'}{' '}
                <Link href={`/posts/${type}/${filter.slug}`}>
                  <a
                    className="dark-text-shadow"
                    style={{ color: 'rgba(' + filter.color + '.9)' }}
                  >
                    {' '}
                    /{filter.name}
                  </a>
                </Link>
              </>
            )}
          </h1>
        )}
        <ul className={'post-list'}>
          {posts.map((it, i) => (
            <div key={i}>
              {type === 'home' && (
                <h1 className="header-large">
                  {filter.name}
                  <Link href={`/posts/categories/${getCat(it.category).slug}`}>
                    <a
                      className="dark-text-shadow"
                      style={{
                        color: 'rgba(' + getCat(it.category).color + '.9)',
                      }}
                    >
                      {' '}
                      /{it.category}
                    </a>
                  </Link>
                </h1>
              )}
              <li key={i} className={'card'}>
                <PostItem post={it} />
              </li>
            </div>
          ))}
        </ul>
        {pagination && (
          <Pagination
            current={pagination.current}
            pages={pagination.pages}
            link={
              type
                ? {
                    href: () => '/posts/' + type + '/[[...slug]]',
                    as: (page) =>
                      page === 1
                        ? '/posts/' + type + '/' + filter.slug
                        : `/posts/${type}/${filter.slug}/${page}`,
                  }
                : {
                    href: (page) =>
                      page === 1 ? '/posts' : '/posts/page/[page]',
                    as: (page) => (page === 1 ? null : '/posts/page/' + page),
                  }
            }
          />
        )}
      </div>
      {tags && (
        <ul className={'categories card'}>
          {tags.map((it, i) => (
            <li key={i}>
              <TagLink tag={it} />
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          width: 100%;
          justify-content: space-around;
          align-items: center;
          padding: 4vmin 0;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        h1 {
          text-shadow: 1px 2px 2px #100e;
          font-size: 3em
        }
        .header-large {
          font-size: 3em;
        }
        .dark-text-shadow {
          text-shadow: 3px 1px 0px #0b0406;
        }
        .posts {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-width: 1200px;
        }
        .posts li {
          margin-bottom: 1.5rem;
          display: flex;
          box-shadow: 0 0 25px 1px rgba(211, 184, 196, 0.3),
            inset 0 0 40px 0px rgba(11, 4, 6, 0.05),
            0.7vmin -0.7vmin 1vmin 0 rgba(11, 4, 6, 0.1);
        }
        .categories {
          display: none;
        }
        .categories li {
          margin: 1vmin 0.1vmin;
        }
        @media (min-width: 769px) and (min-height: 460px) {
          .categories {
            align-self: baseline;
            padding: 2vmin;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            flex-direction: row;
            min-height: 250px;
            max-height: 80vh;
            font-weight: 400;
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            margin-left: 1.5rem;
            margin-top: 5rem;
            box-shadow: 0 0 25px 1px rgba(211, 184, 196, 0.3),
              inset 0 0 40px 0px rgba(11, 4, 6, 0.05),
              0.7vmin -0.7vmin 1vmin 0 rgba(11, 4, 6, 0.1);
          }
        }
      `}</style>
    </div>
  )
}
