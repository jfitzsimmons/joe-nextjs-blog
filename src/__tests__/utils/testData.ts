import { FilterContent } from '../../common/types'
import { PostContent } from '../../features/types'

type StaticData = {
  posts: PostContent[]
  tags: FilterContent[]
  pagination: {
    current: number
    pages: number
  }
}

export const postFilterStaticData: StaticData = {
  posts: [],
  tags: [],
  pagination: { current: 1, pages: 1 },
}

export const postFilterStaticDatadelettestjpf = {
  posts: {},
  tags: [],
  pagination: { current: 1, pages: 1 },
}
