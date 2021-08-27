import { GetStaticProps, GetStaticPaths } from "next";
import { fetchPostContent } from "../../lib/posts";
import fs from "fs";
import { parseISO } from 'date-fns';
import PostLayout from "../../components/PostLayout";

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  category: string;
  tags: string[];
  chapters: object[];
  author: string;
  description?: string;
};

const slugToPostContent = (postContents => {
  let hash = {}
  postContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPostContent());

export default function Post({
  title,
  dateString,
  slug,
  category,
  tags,
  chapters,
  author,
  description,
}: Props) {
  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      chapters={chapters}
      author={author}
      description={description}
    >
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map(it => "/posts/" + it.slug);
  return {
    paths, 
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const data= JSON.parse(source);
  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: "",
      tags: data.tags,
      category: data.category,
      author: data.author,
      chapters: data.chapters,
    },
  };
};