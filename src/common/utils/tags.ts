import tags from '../../../meta/tags.yml'
import { TagContent } from '../types'

function generateTagMap(): { [key: string]: TagContent } {
  const result: { [key: string]: TagContent } = {}
  tags.tags.forEach((t) => {
    result[t.slug] = t
  })
  return result
}

const tagMap: { [key: string]: TagContent } = generateTagMap()

export function getTag(slug: string) {
  return tagMap[slug]
}

export function listTags(): TagContent[] {
  return tags.tags
}

export function childTags(p): TagContent[] {
  return tags.tags.filter((t) => t.parent === p)
}
