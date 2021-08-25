import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import CatPostList from "../../../components/CatPostList";
import config from "../../../lib/config";
import { countPosts, listPostContent, PostContent } from "../../../lib/posts";
import { getCat, listCats, CatContent } from "../../../lib/categories";
import { TagContent, childTags } from "../../../lib/tags";

type Props = {
  posts: PostContent[];
  category: CatContent;
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
      <CatPostList posts={posts} cat={category} tags={tags} pagination={pagination} />
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
    pages: Math.ceil(countPosts(slug) / config.posts_per_page),
  };
  const props: {
    posts: PostContent[];
    category: CatContent;
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
    const pages = Math.ceil(countPosts(category.slug) / config.posts_per_page);
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
