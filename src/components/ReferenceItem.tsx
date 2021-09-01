import { Field } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import TagLink from "./TagLink";
import { getTag } from "../lib/tags";
import { getCat } from "../lib/categories";

type Props = {
  field: Field;
};

export default function ReferenceItem({ field }: Props) {
  const category = getCat(field.category);
  return (
    <>
      <Link href={field.reference.url}>
        <a className="card top" >
          <span className={"title"}>{field.reference.title}</span> | {field.reference.source} | <Date date={parseISO(field.reference.date)} />
        </a> 
      </Link>
      <Link href={"/posts/" + field.url}>
        <a className="card-dark bottom">
          {field.title} | <Date date={parseISO(field.date)} />
        </a> 
      </Link>
      <ul className={"tag-list"} >
          <li style={{borderTop: ".25em solid rgb("+category.color+")"}}>
            <Link href={"/posts/field/categories/" + category.name}>
                {field.category}
            </Link>
          </li>
          <li>
            <ul className={"tag-item"}>
            {field.tags.map((it, i) => (
              <li key={i}>
                <TagLink tag={getTag(it)} type="reference" />
              </li>
            ))}
            </ul>
          </li>
        </ul>
      <style jsx>
        {`
          a {
            color: #222;
            display: block;
            padding: 1rem;
          }
          .tags {
            blur(2px) saturate(400%);
          }
          .top {
            border-radius: 12px 12px 0 0;
          }
          .bottom {
            border-radius: 0 0 12px 12px;
            color: white;
            text-align: right;
            border: 0;
          }
          .title {
            font-weight: 500;
          }
          .description {
            margin-bottom: 1rem;
          }
          h2 {
            margin: 0;
            font-weight: 500;
          }
          ul {
            list-style: none;
            display: flex;
            justify-content: space-between;
          }
          .tag-list {
            padding: 0 1em;
            box-sizing: border-box;
          }
          .tag-list li {
            backdrop-filter: blur(3px) brightness(107%) saturate(107%);
            padding: 0 .5rem .25rem;
            border-radius: 0 0 12px 12px;
          }
          .tag-item {
            border-top: .25rem solid #fff;
          }
        `}
      </style>
    </>
  );
}
