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
        <li className={"card"}>
          <Link href={"/posts/field/categories/" + category.name}>
            <a className="category-link">{field.category}</a>
          </Link>
        </li>
        <li className={"card"}>
          <ul className={"tag-item"}>
          {field.tags.map((it, i) => (
            <li key={i} className="tag-item__tag">
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
            padding: 3vmin;
          }
          .top {
            border-radius: 4vmin 4vmin 0 0;
          }
          .bottom {
            border-radius: 0 0 4vmin 4vmin;
            color: white;
            text-align: right;
            border: 0;
            font-size: 85%;
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
            font-weight: 400;
          }
          .tag-list li ul li{
            padding: .5vmin;
          }
          .tag-list li {
            border-radius: 0 0 2vmin 2vmin;
            border: 0px;
          }

          .tag-list li a {
            padding: 0.5vmin 2vmin 1vmin;
            border-radius: 0 0 2vmin 2vmin;
            height: 100%;
display: flex;
align-items: center;

          }
          .tag-item {
            flex-wrap: wrap;
            max-width: 27vmin;
          }
          .category-link {
            background-color: ${(category.color) ? 'rgba(' + category.color + '.8)' : 'rgba(21, 132, 125, 0.2)'};

            color: #222;
            transition: background-color 0.3s ease;
            padding: 0.25em 0.5em;
          }
          .category-link:hover {
            background-color: #9f9797; text-shadow: 0 0 .1vmin #000;
            color: #fff;
          }          
        `}
      </style>
    </>
  );
}
