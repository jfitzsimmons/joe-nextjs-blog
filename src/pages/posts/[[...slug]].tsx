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
}
export default function Index({ posts, tags, pagination, filterType }: Props) {
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
        type={filterType}
      />
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[]
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

  const pagination = {
    current: page ? parseInt(page as string, 10) : 1,
    pages,
  }
  // console.log('pagination')
  // console.dir(pagination)

  const props: {
    posts: PostContent[]
    tags: FilterContent[]
    pagination: { current: number; pages: number }
    page?: string
    filterType: string
  } = { posts, tags, pagination, filterType }
  if (page) {
    props.page = page
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

  const paths = slugArrays.flatMap((sA) => {
    // const filterType = filter && filter.color ? 'categories' : 'tags'

    // testjpf instead of sending just filter.slug
    // send the whole filter
    // that will include color, parent, tags???
    // sort that logic out later in the process
    /**
     * testjpf new!!! make slug include filterType as part of params (URL)
     * then you can have a default filter / categories / tag pages
     * and all of them and there children will use THIS page!!!
     */

    // console.log(`filterType: ${filterType} | filter.slug: ${filter.slug}`)
    const pages =
      sA[1] && sA[1] === 'categories'
        ? Math.ceil(listCats().length / config.posts_per_page)
        : Math.ceil(countPosts() / config.posts_per_page)
    // console.log('sA[1]', sA[1])
    // console.log('pages', pages)
    return Array.from(Array(pages).keys()).map((page) => {
      if (page === 0) {
        return { params: { slug: sA } }
      }
      const withpaging = sA.slice()
      withpaging.push((page + 1).toString())
      // console.dir({ params: { slug: withpaging } })

      return { params: { slug: withpaging } }
    })
  })

  /** 
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
          params: { slug: slugArray },
        }
      : {
          params: { slug: slugArray.push( (page + 1).toString()) },
        },
  )
  */
  //  console.log(paths[1].params)
  // console.dir(paths)

  return {
    paths,
    fallback: false,
  }
}
