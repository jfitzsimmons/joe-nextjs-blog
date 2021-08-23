import React from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";

type Props = {
  posts: PostContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function PostList({ posts, tags, pagination }: Props) {
  //console.log('cats');
  //console.dir(cats);
  return (
    <div className={"container"}>
      <div className={"posts"}>
        <ul className={"post-list card"}>
          {posts.map((it, i) => (
            <li key={i}>
              <PostItem post={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/posts" : "/posts/page/[page]"),
            as: (page) => (page === 1 ? null : "/posts/page/" + page),
          }}
        />
      </div>
      <ul className={"categories card"}>
        {tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          width: 100%;
          padding: 0 1.5rem;
          justify-content: space-around;
          align-items: center;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .posts {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-width: 1200px;
        }
        .posts li {
          margin-bottom: 1.5rem;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: flex;
            flex-direction: column;
            max-height: 250px;
            flex-wrap: wrap;
            flex-direction: row;
            max-height: 300px;
            -webkit-flex-wrap: wrap;
            writing-mode: sideways-lr;
          }
        }
      `}</style>
    </div>
  );
}
