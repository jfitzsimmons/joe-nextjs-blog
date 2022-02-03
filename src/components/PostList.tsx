import React from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";
import { FilterContent } from "../lib/categories";
import { orderBy } from "../utils/arrays"

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
  if (tags) tags = orderBy(tags, ['slug'], ['asc']);
  return (
    <div className={"container with-posts"}>
      <div className={"posts"}>
        <h1>
          {(!type) ? `All Posts` : <span> / {filter.name}</span>}
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
          box-shadow: 0 0 2vmin 0 rgba(21, 5, 7, 0.1);
        }
        .categories {
          display: none;
        }
        .categories li {
          margin: 1vmin 0.1vmin;
        }
        @media (min-width: 769px) {
          .categories {
            padding: 4vmin;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            flex-direction: row;
            max-height: 450px;
            min-height: 250px;
            height: 50vh;
            font-weight: 400;            
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            margin-left: 1.5rem;
            box-shadow: 0 0 2vmin 0 rgba(21, 5, 7, 0.1);
          }
        }
      `}</style>
    </div>
  );
}
