import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../features/components/layout/Layout'
import BasicMeta from '../common/components/meta/BasicMeta'
import OpenGraphMeta from '../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../common/components/meta/TwitterCardMeta'
import { listCats } from '../common/utils/categories'
import { listTags } from '../common/utils/tags'
import { latestPostContent } from '../features/utils/posts'
import { TagContent } from '../common/types'
import { PostContent } from '../features/types'
import Home from '../features/components/Home'
import PostList from '../features/components/lists/PostList'

type Props = {
  posts: PostContent[]
  tags: TagContent[]
}

export default function Index({ posts, tags }: Props) {
  return (
    <Layout>
      <BasicMeta url="/" />
      <OpenGraphMeta url="/" />
      <TwitterCardMeta url="/" />
      <Home />
      <PostList
        posts={posts}
        tags={tags}
        type="home"
        filter={{ slug: 'latest', name: 'latest' }}
        pagination={{
          current: 0,
          pages: 0,
        }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const cats = listCats()
  const posts = latestPostContent(cats)
  const tags = listTags()
  return {
    props: {
      posts,
      tags,
    },
  }
}
