import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../features/components/layout/Layout'
import BasicMeta from '../../../common/components/meta/BasicMeta'
import OpenGraphMeta from '../../../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../../common/components/meta/TwitterCardMeta'
import PostList from '../../../features/components/lists/PostList'
import config from '../../../common/utils/config'
import { PostContent } from '../../../features/types'
import { countPosts, listPostContent } from '../../../features/utils/posts'
import { getCat, listCats } from '../../../common/utils/categories'
import { childTags } from '../../../common/utils/tags'
import { FilterContent } from '../../../common/types'

type Props = {
  posts: PostContent[]
  category: FilterContent
  tags: FilterContent[]
  page?: string
  pagination: {
    current: number
    pages: number
  }
}

export default function Index({
  posts,
  category,
  tags,
  pagination,
  page,
}: Props) {
  const url = `/posts/categories/${category.name}${page ? `/${page}` : ''}`
  const title = category.name
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
        filter={category}
        type="categories"
        tags={tags}
        pagination={pagination}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[]
  const [slug, page] = [queries[0], queries[1]]
  const posts = listPostContent(
    page ? parseInt(page as string, 10) : 1,
    config.posts_per_page,
    slug,
  )
  const category = getCat(slug)
  const tags = childTags(category.name)
  const pagination = {
    current: page ? parseInt(page as string, 10) : 1,
    pages: Math.ceil(countPosts(slug, 'category') / config.posts_per_page),
  }
  const props: {
    posts: PostContent[]
    category: FilterContent
    tags: FilterContent[]
    pagination: { current: number; pages: number }
    page?: string
  } = { posts, category, tags, pagination }
  if (page) {
    props.page = page
  }
  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listCats().flatMap((category) => {
    const pages = Math.ceil(
      countPosts(category.slug, 'category') / config.posts_per_page,
    )
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [category.slug] },
          }
        : {
            params: { slug: [category.slug, (page + 1).toString()] },
          },
    )
  })
  return {
    paths,
    fallback: false,
  }
}

Index.defaultProps = {
  page: '',
}
