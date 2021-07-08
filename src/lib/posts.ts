import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostContent = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly category?: string;
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
      //console.log('fileContents');
      //console.log(fileContents);

      // Use gray-matter to parse the post metadata section
      /** 
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      **/
     /**
      * no long using gray-matter.  Remove it, rename variables
      */
      const matterResult= JSON.parse(fileContents);
      const matterData = matterResult as {
        date: string;
        title: string;
        tags: string[];
        category: string;
        slug: string;
        fullPath: string,
      };
      matterData.fullPath = fullPath;


      /**
       * why is there slog and data slug?
       * probably don't need.  Jsut use data slug.
       * data slug should probably be auto built through template tags
       * not cms slug field
       * whats with the condtional??? (Validate slug string)
       */
       matterData.slug = fileName.replace(/\.json$/, "");

      // Validate slug string
      /** 
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }
      **/

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
 //console.log('tag?')
  //console.log(tag)
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
      //same tag / post issue as fetchPostContent
      (meta === 'tags') ?
      (it) => !slug || (it.tags && it.tags.includes(slug)) :
      (it) => !slug || (it.category && it.category === slug)
      )
    .slice((page - 1) * limit, page * limit);
}
