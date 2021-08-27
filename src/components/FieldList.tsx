import React from "react";
import { PostContent, Field } from "../lib/posts";
import { CatContent } from "../lib/categories";
import { TagContent } from "../lib/tags";
import { FieldContent } from "../lib/fields";

import ReferenceItem from "./ReferenceItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";

type Props = {
  fields: Field[];
  field: FieldContent;
  //cat: CatContent;
  //tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function TagPostList({ fields, cat, tags, pagination, field }: Props) {
  return (
    <div className={"container"}>
      <div className={"posts"}>
        {/**<h1>
          All posts / <span>{cat.name}</span>
        </h1>**/}
        <ul className={"post-list"}>
          {fields.map((it, i) => (
            <li key={i} >
              <ReferenceItem field={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: () => "/posts/field/[[...slug]]",
            as: (page) =>
              page === 1
                ? "/posts/field/" + field.slug
                : `/posts/field/${field.slug}/${page}`,
          }}
        />
      </div>
      {/** 
      <ul className={"categories card"}>
        {tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>*/}
      <style jsx>
        {`
          .container {
            display: flex;
            margin: 0 auto;
            width: 100%;
            padding: 0 1.5rem;
            justify-content: space-around;
            align-items: center;
          }
          h1 {
            margin: 0 0 2rem;
            padding: 0;
            font-weight: 100;
            font-size: 1.75rem;
            color: #9b9b9b;
            text-shadow: 1px 1px 5px #fff;
          }
          h1 span {
            font-weight: bold;
            color: #222;
          }
          ul {
            margin: 0;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit,minmax(396px,1fr));
            grid-gap: 5px;
          }
          li {
            list-style: none;
          }
          .posts {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            max-width: 1200px;
            width: 100%;
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
            h1 {
              font-size: 2rem;
            }
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
        `}
      </style>
    </div>
  );
}
