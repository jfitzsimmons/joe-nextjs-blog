//import { AuthorContent } from "../lib/authors";
import React from "react";

import { ReactNode } from "react";

type Props = {
  body: string;
  title: string;
  category: string;
};
export default function Chapter({ body, title, category }: Props) {
  return (
    <div className={`act-${category}`}>
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{__html: body}}></div>
        <a href="">{category}</a>
    </div>
  );
}