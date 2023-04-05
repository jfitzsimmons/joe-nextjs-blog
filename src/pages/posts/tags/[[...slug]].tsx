import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../features/components/layout/Layout";
import BasicMeta from "../../../common/components/meta/BasicMeta";
import OpenGraphMeta from "../../../common/components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../common/components/meta/TwitterCardMeta";
import PostList from "../../../features/components/lists/PostList";
import config from "../../../common/utils/config";
import { countPosts, listPostContent, PostContent } from "../../../lib/posts";
import { getTag, listTags, TagContent } from "../../../common/utils/tags";

type Props = {
  posts: PostContent[];
  tag: TagContent;
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ posts, tag, pagination, page }: Props) {
  const url = `/posts/tags/${tag.name}` + (page ? `/${page}` : "");
  const title = tag.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} filter={{slug: tag.slug, name: tag.name, color: "159, 153, 153,"}} type="tags" pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[];
  const [slug, page] = [queries[0], queries[1]];
  const posts = listPostContent(
    page ? parseInt(page as string) : 1,
    config.posts_per_page,
    slug,
    'tags'
  );
  const tag = getTag(slug);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(countPosts(slug,'tags') / config.posts_per_page),
  };
  const props: {
    posts: PostContent[];
    tag: TagContent;
    pagination: { current: number; pages: number };
    page?: string;
  } = { posts, tag, pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listTags().flatMap((tag) => {
    const pages = Math.ceil(countPosts(tag.slug,'tags') / config.posts_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [tag.slug] },
          }
        : {
            params: { slug: [tag.slug, (page + 1).toString()] },
          }
    );
  });
  return {
    paths: paths,
    fallback: false,
  };
};
