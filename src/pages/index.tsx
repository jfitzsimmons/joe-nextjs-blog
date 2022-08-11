import { useState, useRef, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import { latestPostContent, PostContent } from "../lib/posts";
import { listCats } from "../lib/categories";
import { listTags, TagContent } from "../lib/tags";
import PostList from "../components/PostList";
import Canvas from "../components/Canvas";
import { mountains } from "../utils/mountains";

type Props = {
  posts: PostContent[];
  tags: TagContent[];
};

export default function Index({ posts, tags }: Props) {
  const [dimensions, setDimensions] = useState({w:0,h:0});
  const div = useRef(null);

  useEffect( () => {
    if(div.current) setDimensions({
      w: div.current.offsetWidth,
      h: Math.round(window.innerHeight*.33
    )});
  }, []);
  
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container logo">
        <div className="flex-column">
          <div className="mountains" ref={div}>
            <h1>
              Insincere <span className="fancy">Engineer</span>
            </h1>
            <Canvas draw={mountains} height={dimensions.h} width={dimensions.w} fader={0} animation={false} instance={"home"}/>
          </div>
          <div className="card">
            {/*<span className="handle">@nextjs-netlify-blog </span>*/}
            <h2>A website so novel, it's arguably a complete waste of time!</h2>
            <SocialList />
          </div>
        </div>
      </div>
      <PostList posts={posts} tags={tags} type="home" filter={{slug: "latest", name: "latest"}}/>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          min-height: 100vh;
        }
        .flex-column {
          box-shadow: 0 0 30px 10px rgba(211, 184, 196, .3), inset 0 0 40px 0px rgba(11, 4, 6, 0.2);
          border-radius: 4vmin;
        }
        .mountains {
          height: 33vh;
          position: relative;
        }
        .card {
          padding: 4vmin;
          border-radius: 3px 0 4vmin 4vmin;
        }
        h1 {
          font-size: calc(1rem + 4vw);
          z-index: 1;
          position: absolute;
          font-weight: 500;
          bottom: 4vmin;
          right: 4vmin;
          height: 55px;
          margin: 0 4vmin 0 0;
          text-align: right;
          color: #fff; 
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
          margin-top: 0;
        }
        .fancy {
          color: #6FEDEB;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9f9797; 
          text-shadow: 0 0 .1vmin #000;
          letter-spacing: 0.05em;
        }
        .heading {
          width: 100%;
          text-align: center;
          margin: 0;
        }
        @media (min-width: 769px) {
          h1 {
            font-size: calc(2rem + 2vw);
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
      tags,
    },
  };
};
