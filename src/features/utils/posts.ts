import fs from 'fs'
import path from 'path'
import { FilterContent } from '../../common/types'
import { PostContent } from '../types'

const postsDirectory = path.join(process.cwd(), 'content/posts')
let postCache: PostContent[]

export function fetchPostContent() {
  if (postCache) {
    return postCache
  }
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((it) => it.endsWith('.json'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      /**
       * in here you'll need something that finds the chapters
       */
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section /testjpf just the chapter section bodies
      /**
       * testjpf
       * 
       * reinstall graymatter
       * 
       * foreach chapter in file, get chapter body, parse with matter()
       * save over that chpater body
       * 
       * MISLEAD
       * 
       * I think this needs to be after const result = JSON.parse(fileContents)
       * 
       * loop through result, do the same (foreach chapter in result)

   
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        title: string;
        tags: string[];
        slug: string;
        fullPath: string,
      };
      matterData.fullPath = fullPath;
       */

      const result = JSON.parse(fileContents)

      result.fullPath = fullPath
      result.slug = fileName.replace(/\.json$/, '')

      return result
    })

  // Sort posts by date
  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }
    return -1
  })

  return postCache
}

export function countPosts(slug?: string, meta?: string): number {
  return fetchPostContent().filter(
    meta === 'tags'
      ? (it) => !slug || (it.tags && it.tags.includes(slug))
      : (it) => !slug || (it.category && it.category === slug),
  ).length
}

export function listPostContent(
  page: number,
  limit: number,
  slug?: string,
  meta?: string,
): PostContent[] {
  return fetchPostContent()
    .filter(
      meta === 'tags'
        ? (it) => !slug || (it.tags && it.tags.includes(slug))
        : (it) => !slug || (it.category && it.category === slug),
    )
    .slice((page - 1) * limit, page * limit)
}

export function latestPostContent(cats: FilterContent[]): PostContent[] {
  const latest = []
  const postsWithCats = fetchPostContent().filter((it) => it.category)
  cats.forEach((c) => {
    latest.push(postsWithCats.find((p) => p.category === c.name))
  })
  return latest
}
