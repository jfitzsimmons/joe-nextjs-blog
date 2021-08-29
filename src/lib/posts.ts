import fs from "fs";
import path from "path";
import { CatContent } from "./categories";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostContent = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly category?: string;
  readonly description?: string;
  readonly references?: object[];
  readonly fullPath: string;
};

export type Reference =  {
  index: number;
  date: string;
  source: string;
  title: string;
  url: string;
}

export type Field =  {
  category: string;
  date: string;
  tags: string[];
  title: string;
  url: string;
  reference: Reference;
}

let postCache: PostContent[];

export function fetchPostContent(): PostContent[] {
  if (postCache) {
    return postCache;
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((it) => it.endsWith(".json"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const result= JSON.parse(fileContents);
      result.fullPath = fullPath;
      result.slug = fileName.replace(/\.json$/, "");

      return result;
    });

  // Sort posts by date
  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return postCache;
}

export function countPosts(
  slug?: string,
  meta?: string,
  ): number {
  return fetchPostContent().filter(
    (meta === 'tags') ?
    (it) => !slug || (it.tags && it.tags.includes(slug)) :
    (it) => !slug || (it.category && it.category === slug)
  ).length;
}

export function listPostContent(
  page: number,
  limit: number,
  slug?: string,
  meta?: string,
): PostContent[] {
  return fetchPostContent()
    .filter(
      (meta === 'tags') ?
      (it) => !slug || (it.tags && it.tags.includes(slug)) :
      (it) => !slug || (it.category && it.category === slug)
      )
    .slice((page - 1) * limit, page * limit);
}

export function latestPostContent(
  cats: CatContent[],
): PostContent[] {
  let latest = [];
  let postsWithCats = fetchPostContent().filter((it) => (it.category));
  cats.forEach( c => {
    latest.push(postsWithCats.find((p) => p.category === c.name));
  });
  return latest
}
