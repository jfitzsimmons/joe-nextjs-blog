import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
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
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[]
  console.log('queries')
  console.log(queries)

  const page = queries && queries[0] ? queries[0] : '1'
  const posts = listPostContent(
    page ? parseInt(page as string, 10) : 1,
    config.posts_per_page,
  )
  console.log('posts.length', posts.length)

  const tags = listTags()
  const pagination = {
    current: page ? parseInt(page as string, 10) : 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  }

  const props: {
    posts: PostContent[]
    tags: FilterContent[]
    pagination: { current: number; pages: number }
    page?: string
  } = { posts, tags, pagination }
  if (page) {
    props.page = page
  }
  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countPosts() / config.posts_per_page)
  // console.log(pages, 'pages')
  // const posts = listPostContent(1, config.posts_per_page)
  // const tags = listTags()

  /**
   * testjpf
   * i think i can just harcode something herer for psosts
   * posts/
   * posts/categories/
   * posts/filter
   *
   * NO LOOPING
   * build slug array before here
   * meaning...
   *
   */
  const paths = Array.from(Array(pages).keys()).map((page) =>
    page === 0
      ? {
          // testjpf works:
          // you'll need to get logic
          // build slug array before here
          // * meaning...
          // check if page === 0
          // before buoilding params
          // START TESTJPF here  otiional catch-all route
          // one for cats, tags, filter, and field
          params: { slug: [] },
        }
      : {
          params: { slug: [(page + 1).toString()] },
        },
  )
  console.log(paths[1].params)
  console.dir(paths)
  console.log('paths.length', paths.length)
  return {
    paths,
    fallback: false,
  }
}
