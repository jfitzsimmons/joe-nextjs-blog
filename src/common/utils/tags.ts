import tags from '../../../meta/tags.yml'
import { FilterContent } from '../types'

function generateTagMap(): { [key: string]: FilterContent } {
  const result: { [key: string]: FilterContent } = {}
  tags.tags.forEach((t) => {
    result[t.slug] = t
  })
  return result
}

const tagMap: { [key: string]: FilterContent } = generateTagMap()

export function getTag(slug: string) {
  return tagMap[slug]
}

export function listTags(): FilterContent[] {
  return tags.tags
}

export function childTags(p): FilterContent[] {
  return tags.tags.filter((t) => t.parent === p)
}
