import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../features/components/layout/Layout'
import BasicMeta from '../../common/components/meta/BasicMeta'
import OpenGraphMeta from '../../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../common/components/meta/TwitterCardMeta'
import PostList from '../../features/components/lists/PostList'
import config from '../../common/utils/config'
import {
  countPosts,
  latestPostContent,
  listPostContent,
} from '../../features/utils/posts'
import { listTags } from '../../common/utils/tags'
import { FilterContent } from '../../common/types'
import { PostContent } from '../../features/types'
import { listCats } from '../../common/utils/categories'

type Props = {
  posts: PostContent[]
  tags: FilterContent[]
  pagination: {
    current: number
    pages: number
  }
  filterType: string
  filter: FilterContent
}
export default function Index({
  posts,
  tags,
  pagination,
  filterType,
  filter,
}: Props) {
  const url = '/posts'
  const title = 'All posts'
  /**
   * testjpf
   * a test could be...
   * browser test would be go to url and see if headings are correct
   * but
   * jest would be fill postlist component with dummy data??
   * especially type and filter???
   * google 'use jest to test getStaticPaths / Props'
   */
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
        type={filterType}
        filter={filter}
      />
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params ? (params.slug as string[]) : []
  const filterType = queries && queries[1] ? queries[1] : 'all'
  const page = queries && queries[2]
  const posts =
    filterType === 'categories'
      ? latestPostContent(listCats())
      : listPostContent(
          page ? parseInt(page as string, 10) : 1,
          config.posts_per_page,
        )

  const tags = listTags() // testjpf:::needs logic
  // testjpf turn into util
  const pages =
    filterType === 'categories'
      ? Math.ceil(listCats().length / config.posts_per_page)
      : Math.ceil(countPosts() / config.posts_per_page)

  const filter =
    filterType === 'categories' ? { slug: 'latest', name: 'latest' } : null

  const pagination = {
    current: page ? parseInt(page as string, 10) : 1,
    pages,
  }

  const props: {
    posts: PostContent[]
    tags: FilterContent[]
    pagination: { current: number; pages: number }
    page?: string
    filterType: string
    filter?: FilterContent
  } = { posts, tags, pagination, filterType }
  if (page) {
    props.page = page
  }
  if (filter) {
    props.filter = filter
  }
  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugArrays = [
    [],
    ['filter'],
    ['filter', 'categories'],
    ['filter', 'tags'],
  ]

  const paths = slugArrays.flatMap((sA) => {
    const pages =
      sA[1] && sA[1] === 'categories'
        ? Math.ceil(listCats().length / config.posts_per_page)
        : Math.ceil(countPosts() / config.posts_per_page)

    return Array.from(Array(pages).keys()).map((page) => {
      if (page === 0) {
        return { params: { slug: sA } }
      }
      const withpaging = sA.slice()
      withpaging.push((page + 1).toString())

      return { params: { slug: withpaging } }
    })
  })

  return {
    paths,
    fallback: false,
  }
}
