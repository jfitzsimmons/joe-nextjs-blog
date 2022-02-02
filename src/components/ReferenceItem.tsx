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
        <li style={{borderTop: ".5vmin solid rgb("+category.color+"1)"}}>
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
            padding: 4vmin;
          }
          .tags {
            blur(2px) saturate(400%);
          }
          .top {
            border-radius: 4vmin 4vmin 0 0;
          }
          .bottom {
            border-radius: 0 0 4vmin 4vmin;
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
            padding: 0;
          }
          .tag-list {
            padding: 0 4vmin;
            box-sizing: border-box;
          }
          .tag-list li ul li{
            padding: .5vmin;
          }
          .tag-list li {
            backdrop-filter: blur(3px) brightness(107%) saturate(107%);
            padding: 0.5vmin 2vmin 1vmin;
            border-radius: 0 0 2vmin 2vmin;
          }
          .tag-item {
            flex-wrap: wrap;
            max-width: 27vmin;
          }
        `}
      </style>
    </>
  );
}
