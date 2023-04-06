import categories from '../../../meta/categories.yml'
import { FilterContent } from '../types'

function generateCatMap(): { [key: string]: FilterContent } {
  const result: { [key: string]: FilterContent } = {}
  categories.categories.forEach((c) => {
    result[c.slug] = c
  })
  return result
}

const catMap: { [key: string]: FilterContent } = generateCatMap()

export function getCat(slug: string) {
  return catMap[slug]
}

export function listCats(): FilterContent[] {
  return categories.categories
}
