import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../../features/components/layout/Layout'
import BasicMeta from '../../common/components/meta/BasicMeta'
import OpenGraphMeta from '../../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../common/components/meta/TwitterCardMeta'
import PostList from '../../features/components/lists/PostList'
import config from '../../common/utils/config'
import { countPosts, listPostContent } from '../../features/utils/posts'
import { listTags } from '../../common/utils/tags'
import { FilterContent } from '../../common/types'
import { PostContent } from '../../features/types'

type Props = {
  posts: PostContent[]
  tags: FilterContent[]
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
        type="all"
      />
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  console.log(
    'Math.ceil(countPosts() / config.posts_per_page),',
    Math.ceil(countPosts() / config.posts_per_page),
  )
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
