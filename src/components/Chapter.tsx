//import { AuthorContent } from "../lib/authors";
import React from "react";
import { getCat } from "../lib/categories";

type Props = {
  body: string;
  title: string;
  category: string;
};
export default function Chapter({ body, title, category }: Props) {
  return (
    <>
      <div className={`act-${category}`}>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{__html: body}}></div>
          <a className="cat-button" href="">{category}</a>
      </div>
      <style jsx>{`
        .cat-button {
          transition: background-color 0.3s ease;
          padding: 0.25em 0.75em;
          border-radius: 4vmin;
          float: right;
          background-color: ${getCat(category).color ? 'rgba(' + getCat(category).color + '.8)' : 'rgba(21, 132, 125, 0.2)'};
          color: #222;
        }
        .cat-button:active,
        .cat-button:hover {
          background-color: #9f9797; text-shadow: 0 0 .1vmin #000;
          color: #fff;
        }
      `}</style>
    </>
  );
}