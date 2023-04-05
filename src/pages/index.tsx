import { GetStaticProps } from 'next'
import Layout from '../features/components/layout/Layout'
import BasicMeta from '../common/components/meta/BasicMeta'
import OpenGraphMeta from '../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../common/components/meta/TwitterCardMeta'
import { latestPostContent, PostContent } from '../lib/posts'
import { listCats } from '../common/utils/categories'
import { listTags, TagContent } from '../common/utils/tags'
import  Home  from '../features/components/Home'
import PostList from '../features/components/lists/PostList'


type Props = {
  posts: PostContent[]
  tags: TagContent[]
}

export default function Index({ posts, tags }: Props) {
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <Home />
      <PostList
        posts={posts}
        tags={tags}
        type="home"
        filter={{ slug: 'latest', name: 'latest' }}
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
