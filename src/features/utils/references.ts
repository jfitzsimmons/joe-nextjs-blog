import { fetchPostContent } from './posts'
import { PostContent } from '../types'

export function listPostRefs(
  page: number,
  limit: number,
  slug?: string,
  // meta?: string,
): PostContent[] {
  const refs = []
  const postsWithRefs = fetchPostContent()
    .filter((it) => it.references)
    .filter(
      (it) =>
        !slug ||
        (it.category && it.category === slug) ||
        (it.tags && it.tags.includes(slug)),
    )

  postsWithRefs.forEach((p) => {
    p.references.forEach((r) => {
      refs.push({
        reference: r,
        url: p.slug,
        category: p.category,
        date: p.date,
        tags: p.tags,
        title: p.title,
      })
    })
  })
  refs.slice((page - 1) * limit, page * limit)
  return refs
}

export function countRefs(slug?: string, meta?: string): number {
  let count = 0
  const postsWithRefs = fetchPostContent().filter(
    meta === 'tags'
      ? (it) => it.references && it.tags.includes(slug)
      : (it) => it.references,
  )
  function addRefLength(refLength) {
    count += refLength
  }
  postsWithRefs.forEach((p) => addRefLength(p.references.length))
  return count
}
