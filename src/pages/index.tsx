import { useState, useCallback, useRef, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import { countPosts, latestPostContent, PostContent } from "../lib/posts";
import { CatContent, listCats } from "../lib/categories";
import { listTags, TagContent } from "../lib/tags";
import PostList from "../components/PostList";
import Canvas from "../components/Canvas";
import { mountains } from "../utils/mountains";

type Props = {
  posts: PostContent[];
  cats: CatContent[];
  tags: TagContent[];
};

export default function Index({ posts, cats, tags }: Props) {
  const [width, setWidth] = useState(0);
  const div = useRef(null);

  useEffect( () => {
    if(div.current) setWidth(div.current.offsetWidth);
  }, []);
  
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container logo">
        <div>
          <div className="mountains" ref={div}>
            <h1>
              Insincere <span className="fancy">Engineer</span>
            </h1>
            <Canvas draw={mountains} height={200} width={width} fader={0} animation={false} instance={"home"}/>
          </div>
          <div className="card">
            <span className="handle">@nextjs-netlify-blog </span>
            <h2>A website so novel, it's arguably a complete waste of time!</h2>
            <SocialList />
          </div>
        </div>
      </div>
      <PostList posts={posts} tags={tags} />
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
          min-height: 100vh;
        }
        .mountains {
          width: 100%;
          height: 200px;
          margin-bottom: 55px;
        }
        .card {
          padding: 1rem;
        }
        h1 {
          font-size: 2.5rem;
          z-index: 1;
          position: relative;
          font-weight: 500;
          top: 11rem;
          font-size: 3rem;
          height: 55px;
          margin: 0 1rem 0 0;
          text-align: right;
          color: #fff; 
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #6FEDEB;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cats = listCats();
  const posts = latestPostContent(cats);
  const tags = listTags();
  return {
    props: {
      posts,
      cats,
      tags,
    },
  };
};
