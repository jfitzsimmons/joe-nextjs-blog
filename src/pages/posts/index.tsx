import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../../features/components/layout/Layout'
import BasicMeta from '../../common/components/meta/BasicMeta'
import OpenGraphMeta from '../../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../common/components/meta/TwitterCardMeta'
import PostList from '../../features/components/lists/PostList'
import config from '../../common/utils/config'
import { countPosts, listPostContent, PostContent } from '../../lib/posts'
import { listTags } from '../../common/utils/tags'
import { TagContent } from '../../common/types'

type Props = {
  posts: PostContent[]
  tags: TagContent[]
  pagination: {
    current: number
    pages: number
  }
}
export default function Index({ posts, tags, pagination }: Props) {
  const url = '/posts'
  const title = 'All posts'
  return (
    <Layout>
      <BasicMeta
        url={url}
        title={title}
      />
      <OpenGraphMeta
        url={url}
        title={title}
      />
      <TwitterCardMeta
        url={url}
        title={title}
      />
      <PostList
        posts={posts}
        tags={tags}
        pagination={pagination}
      />
      {/**
       * testjpf is this taken care?!?!?!
      <style jsx>{`
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .heading {
          width: 100%;
          text-align: center;
          margin: 1rem 0 0;
        }
        @media (min-width: 769px) and (min-height: 460px) {
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
       */}
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const posts = listPostContent(1, config.posts_per_page)
  const tags = listTags()
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  }
  return {
    props: {
      posts,
      tags,
      pagination,
    },
  }
}
