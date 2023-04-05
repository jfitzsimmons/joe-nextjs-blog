import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../features/layout/Layout";
import BasicMeta from "../../../../_notes/components/meta/BasicMeta";
import OpenGraphMeta from "../../../../_notes/components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../../_notes/components/meta/TwitterCardMeta";
import PostList from "../../../features/lists/PostList";
import config from "../../../common/utils/config";
import { countPosts, listPostContent, PostContent } from "../../../lib/posts";
import { getCat, listCats, FilterContent } from "../../../common/utils/categories";
import { TagContent, childTags } from "../../../common/utils/tags";

type Props = {
  posts: PostContent[];
  category: FilterContent;
  tags: TagContent[];
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
};

export default function Index({ posts, category, tags, pagination, page }: Props) {
  const url = `/posts/categories/${category.name}` + (page ? `/${page}` : "");
  const title = category.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} filter={category} type="categories" tags={tags} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[];
  const [slug, page] = [queries[0], queries[1]];
  const posts = listPostContent(
    page ? parseInt(page as string) : 1,
    config.posts_per_page,
    slug
  );
  const category = getCat(slug);
  const tags = childTags(category.name);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(countPosts(slug,'category') / config.posts_per_page),
  };
  const props: {
    posts: PostContent[];
    category: FilterContent;
    tags: TagContent[];
    pagination: { current: number; pages: number };
    page?: string;
  } = { posts, category, tags, pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listCats().flatMap((category) => {
    const pages = Math.ceil(countPosts(category.slug,'category') / config.posts_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [category.slug] },
          }
        : {
            params: { slug: [category.slug, (page + 1).toString()] },
          }
    );
  });
  return {
    paths: paths,
    fallback: false,
  };
};
