import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../../features/components/layout/Layout'
import BasicMeta from '../../../../common/components/meta/BasicMeta'
import OpenGraphMeta from '../../../../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../../../common/components/meta/TwitterCardMeta'
import FieldList from '../../../../features/components/lists/FieldList'
import config from '../../../../common/utils/config'
import { PostContent, Field, FieldContent } from '../../../../features/types'
import { listPostRefs, countRefs } from '../../../../features/utils/references'
import { getField } from '../../../../features/utils/fields'
import { listCats } from '../../../../common/utils/categories'
import { listTags } from '../../../../common/utils/tags'
// import { FilterContent } from '../../../../common/types'

type Props = {
  posts: Field[]
  field: FieldContent
  // filter???
  slug: string
  // category: FilterContent
  page?: string
  pagination: {
    current: number
    pages: number
  }
}

export default function Index({
  posts,
  field,
  // category,
  slug,
  pagination,
  page,
}: Props) {
  const url = `/posts/field/${slug}${page ? `/${page}` : ''}`
  // const title = slug
  return (
    <Layout>
      <BasicMeta
        url={url}
        title={slug}
      />
      <OpenGraphMeta
        url={url}
        title={slug}
      />
      <TwitterCardMeta
        url={url}
        title={slug}
      />
      <FieldList
        fields={posts}
        pagination={pagination}
        field={field}
        filter={slug}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[]
  const [slug, page] = [queries[0], queries[1]]
  const posts = listPostRefs(
    page ? parseInt(page as string, 10) : 1,
    config.refs_per_page,
    slug,
    //  'category',
  )
  const field = getField('references')
  // const filter = getCat(slug)
  const pagination = {
    current: page ? parseInt(page as string, 10) : 1,
    pages: Math.ceil(posts.length / config.refs_per_page),
  }
  const props: {
    posts: PostContent[]
    field: FieldContent
    slug: string
    pagination: { current: number; pages: number }
    page?: string
  } = { posts, field, /* tags, */ slug, pagination }
  if (page) {
    props.page = page
  }
  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...listTags(), ...listCats()].flatMap((filter) => {
    const pages = Math.ceil(countRefs(filter.slug) / config.refs_per_page)
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [filter.slug] },
          }
        : {
            params: { slug: [filter.slug, (page + 1).toString()] },
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
