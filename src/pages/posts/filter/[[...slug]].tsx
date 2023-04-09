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
import { childTags, listTags, getTag } from '../../../common/utils/tags'
import { FilterContent } from '../../../common/types'

type Props = {
  posts: PostContent[]
  // category: FilterContent
  tags: FilterContent[]
  filterType: string
  filter: FilterContent
  page?: string
  pagination: {
    current: number
    pages: number
  }
}

export default function Index({
  posts,
  // category,
  tags,
  pagination,
  page,
  filterType,
  filter,
}: Props) {
  const url = `/posts/filter/${filterType}/${filter.slug}${
    page ? `/${page}` : ''
  }`
  const title = filter.slug
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
        filter={filter}
        type={filterType}
        tags={tags}
        pagination={pagination}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[]
  const [filterType, slug, page] = [queries[0], queries[1], queries[2]]
  const filter = filterType === 'tags' ? getTag(slug) : getCat(slug)
  const posts = listPostContent(
    page ? parseInt(page as string, 10) : 1,
    config.posts_per_page,
    slug,
    filterType,
  )
  const category = filterType === 'categories' ? filter : null
  const tags = category && category.name ? childTags(category.name) : []

  const pagination = {
    current: page ? parseInt(page as string, 10) : 1,
    pages: Math.ceil(countPosts(slug) / config.posts_per_page),
  }
  const props: {
    posts: PostContent[]
    category: FilterContent
    tags: FilterContent[]
    pagination: { current: number; pages: number }
    page?: string
    filterType: string
    filter: FilterContent
  } = { posts, category, tags, pagination, filterType, filter }
  if (page) {
    props.page = page
  }
  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...listTags(), ...listCats()].flatMap((filter) => {
    const filterType = filter && filter.color ? 'categories' : 'tags'
    const pages = Math.ceil(
      countPosts(filter.slug, filterType) / config.posts_per_page,
    )

    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [filterType, filter.slug] },
          }
        : {
            params: { slug: [filterType, filter.slug, (page + 1).toString()] },
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
