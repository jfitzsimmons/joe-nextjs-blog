import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostContent = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly category?: string;
  readonly description?: string;
  readonly fullPath: string;
};

let postCache: PostContent[];

export function fetchPostContent(): PostContent[] {
  if (postCache) {
    return postCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((it) => it.endsWith(".json"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult= JSON.parse(fileContents);
      const matterData = matterResult as {
        date: string;
        title: string;
        tags: string[];
        category: string;
        description: string;
        slug: string;
        fullPath: string,
      };
      matterData.fullPath = fullPath;
      matterData.slug = fileName.replace(/\.json$/, "");

      return matterData;
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
    //compares to tags and not at all to category!!!
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
