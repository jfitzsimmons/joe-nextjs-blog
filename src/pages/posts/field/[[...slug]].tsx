import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../features/components/layout/Layout";
import BasicMeta from "../../../common/components/meta/BasicMeta";
import OpenGraphMeta from "../../../common/components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../common/components/meta/TwitterCardMeta";
import FieldList from "../../../features/components/lists/FieldList";
import config from "../../../common/utils/config";
import { PostContent, Field } from "../../../lib/posts";
import { listPostRefs, countRefs } from "../../../lib/references";
import { getField, listFields, FieldContent } from "../../../lib/fields";
import { TagContent } from "../../../common/utils/tags";

type Props = {
  posts: Field[];
  field: FieldContent;
  tags: TagContent[];
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ posts, field, tags, pagination, page }: Props) {
  const url = `/posts/field/${field.name}` + (page ? `/${page}` : "");
  const title = field.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <FieldList fields={posts} pagination={pagination} field={field}/>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[];
  const [slug, page] = [queries[0], queries[1]];
  const posts = listPostRefs(
    page ? parseInt(page as string) : 1,
    config.refs_per_page,
  );
  const field = getField(slug);
  //const tags = childTags(field.name);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(posts.length / config.refs_per_page),
  };
  const props: {
    posts: PostContent[];
    field: FieldContent;
    //tags: TagContent[];
    pagination: { current: number; pages: number };
    page?: string;
  } = { posts, field, /*tags,*/ pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listFields().flatMap((field) => {
    const pages = Math.ceil(countRefs() / config.refs_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [field.slug] },
          }
        : {
            params: { slug: [field.slug, (page + 1).toString()] },
          }
    );
  });
  return {
    paths: paths,
    fallback: false,
  };
};
