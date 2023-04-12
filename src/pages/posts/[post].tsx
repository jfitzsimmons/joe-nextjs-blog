import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import { parseISO } from 'date-fns'
import { fetchPostContent } from '../../features/utils/posts'
import { Reference } from '../../features/types'
import PostLayout from '../../features/components/content/PostLayout'

type Props = {
  title: string
  dateString: string
  slug: string
  category: string
  tags: string[]
  chapters: object[]
  // author: string
  description?: string
  references?: Reference[]
}

const slugToPostContent = ((postContents) => {
  const hash = {}
  function setHash(it) {
    hash[it.slug] = it
  }
  postContents.forEach((it) => setHash(it))
  return hash
})(fetchPostContent())

export default function Post({
  title,
  dateString,
  slug,
  category,
  tags,
  chapters,
  // author,
  description,
  references,
}: Props) {
  // console.log('chapters')
  // console.dir(chapters)
  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      chapters={chapters}
      // author={author}
      category={category}
      description={description}
      references={references}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map((it) => `/posts/${it.slug}`)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, 'utf8')
  const data = JSON.parse(source)

  // testjpf: FIXX ESLINT ISSUE
  // eslint-disable-next-line no-restricted-syntax
  for (const chapter of data.chapters) {
    // eslint-disable-next-line no-param-reassign, no-await-in-loop
    chapter.section.body = await serialize(chapter.section.body)
  }

  // const testjpf = data

  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: data.description,
      tags: data.tags,
      category: data.category,
      author: data.author,
      chapters: data.chapters,
      references: data.references ? data.references : null,
    },
  }
}

Post.defaultProps = {
  description: '',
  references: [],
}
