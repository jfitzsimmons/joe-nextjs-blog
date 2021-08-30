import { fetchPostContent, PostContent } from "./posts";

export function listPostRefs(
    page: number,
    limit: number,
    slug?: string,
    meta?: string,
  ): PostContent[] {
    let refs = [];
    let postsWithRefs = fetchPostContent().filter((it) => !slug || (it.references));
    postsWithRefs.forEach( p => {
      p.references.forEach((r) => {
        refs.push({
          reference: r,
          url: p.slug,
          category: p.category,
          date: p.date,
          tags: p.tags,
          title: p.title,
        })
      });
    });
    refs.slice((page - 1) * limit, page * limit);
    return refs
  }

  export function countRefs(
    slug?: string,
    meta?: string,
    ): number {
      let count = 0
      let postsWithRefs = fetchPostContent().filter((it) => (it.references));
      postsWithRefs.forEach( p => count += p.references.length);
      return count
  }