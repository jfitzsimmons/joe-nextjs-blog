import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
// import Head from "next/head";
import Layout from '../../../features/components/layout/Layout'
import BasicMeta from '../../../common/components/meta/BasicMeta'
import OpenGraphMeta from '../../../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../../common/components/meta/TwitterCardMeta'
import PostList from '../../../features/components/lists/PostList'
import config from '../../../common/utils/config'
import { countPosts, listPostContent, PostContent } from '../../../lib/posts'
import { listTags, TagContent } from '../../../common/utils/tags'

type Props = {
  posts: PostContent[]
  tags: TagContent[]
  page: number
  pagination: {
    current: number
    pages: number
  }
}
export default function Page({ posts, tags, pagination, page }: Props) {
  const url = `/posts/page/${page}`
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
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string, 10)
  const posts = listPostContent(page, config.posts_per_page)
  const tags = listTags()
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  }
  return {
    props: {
      page,
      posts,
      tags,
      pagination,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countPosts() / config.posts_per_page)
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }))
  return {
    paths,
    fallback: false,
  }
}
