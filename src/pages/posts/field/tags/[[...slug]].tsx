import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../../features/layout/Layout";
import BasicMeta from "../../../../../_notes/components/meta/BasicMeta";
import OpenGraphMeta from "../../../../../_notes/components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../../../_notes/components/meta/TwitterCardMeta";
import FieldList from "../../../../../_notes/components/FieldList";
import config from "../../../../common/utils/config";
import { countPosts, PostContent, Field } from "../../../../lib/posts";
import { listPostRefs, countRefs } from "../../../../lib/references";
import { getField, listFields, FieldContent } from "../../../../lib/fields";
import { TagContent, childTags, listTags, getTag } from "../../../../common/utils/tags";

type Props = {
  posts: Field[];
  field: FieldContent;
  tag: TagContent;
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
};

export default function Index({ posts, field, tag, pagination, page }: Props) {
  const url = `/posts/field/${tag.name}` + (page ? `/${page}` : "");
  const title = tag.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <FieldList fields={posts} pagination={pagination} field={field} tag={tag}/>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[];
  const [slug, page] = [queries[0], queries[1]];
  const posts = listPostRefs(
    page ? parseInt(page as string) : 1,
    config.refs_per_page,
    slug,
    'tags'
  );
  const field = getField('references');
  const tag = getTag(slug);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(posts.length / config.refs_per_page),
  };
  const props: {
    posts: PostContent[];
    field: FieldContent;
    tag: TagContent;
    pagination: { current: number; pages: number };
    page?: string;
  } = { posts, field, /*tags,*/ tag, pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listTags().flatMap((tag) => {
    const pages = Math.ceil(countRefs(tag.slug,'tags') / config.refs_per_page);
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