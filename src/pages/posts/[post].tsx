import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchPostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PostLayout from "../../components/PostLayout";

import PostEmbed from "../../components/PostEmbed";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";


/**
 * My original Article collection 
 * with separate Post collection might work now
 * 
 * 
 * 
 */

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  category: string;
  tags: string[];
  chapters: object[];
  author: string;
  description?: string;
  //source: MdxRemote.Source;
};

const components = { PostEmbed, InstagramEmbed, YouTube, TwitterTweetEmbed };
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
  description = "",
  //source,
}: Props) {

  //const content = hydrate(source, { components })

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
      {/**content**/}
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  /** probably need a to change to something like:
   * /posts/category/
   * probably need a [category] or [subPost] file???
   * add caegory to path below: "/posts/"+it.category+it.slug???  
   * need a post lib file?  Not sure I need all 3
   *  * **/
//fetchPostContent is all posts, not just a single post
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
      /** 
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  **/
  //const mdxSource = await renderToString(content, { components, scope: data });
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
      //source: mdxSource
    },
  };
};

