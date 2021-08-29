import React from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";
import { FilterContent } from "../lib/categories";

type Props = {
  posts: PostContent[];
  tags?: TagContent[];
  cat?: FilterContent;
  filter?: FilterContent;
  type?: string;
  pagination?: {
    current: number;
    pages: number;
  };
};

export default function PostList({ posts, tags, filter, type, cat, pagination }: Props) {
  return (
    <div className={"container with-posts"}>
      <div className={"posts"}>
        <h1>
          All posts{(type) && <span> / {filter.name}</span>}
        </h1>
        <ul className={"post-list"}>
          {posts.map((it, i) => (
            <li key={i} className={"card"}>
              <PostItem post={it} />
            </li>
          ))}
        </ul>
        {(pagination) &&
          <Pagination
            current={pagination.current}
            pages={pagination.pages}
            link={
              (type) ? {
                href: () => "/posts/"+type+"/[[...slug]]",
                as: (page) =>
                  page === 1
                    ? "/posts/"+type+"/" + filter.slug
                    : `/posts/${type}/${filter.slug}/${page}`,
              } : {
                href: (page) => (page === 1 ? "/posts" : "/posts/page/[page]"),
                as: (page) => (page === 1 ? null : "/posts/page/" + page),
              }
            }
          />
        }
      </div>
      {(tags) &&
        <ul className={"categories card"}>
          {tags.map((it, i) => (
            <li key={i}>
              <TagLink tag={it} />
            </li>
          ))}
        </ul>
      }
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
          display: flex;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }
        @media (min-width: 769px) {
          .categories {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            max-height: 250px;
            flex-wrap: wrap;
            flex-direction: row;
            max-height: 300px;
            -webkit-flex-wrap: wrap;
            writing-mode: sideways-lr;
            margin-left: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
