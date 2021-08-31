import { PostContent,Field } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import TagLink from "./TagLink";
import CategoryButton from "./CategoryButton";
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
      {/**<CategoryButton cat={getCat(field.category)} />**/}
      <Link href={"/posts/" + field.url}>
        <a className="card-dark bottom" style={{borderTop: ".5rem solid #"+category.color}}>
          {field.title} | <Date date={parseISO(field.date)} />
        </a> 
      </Link>
      <ul className={"tag-list"}>
        <li style={{textShadow: "0px 0px 2px #"+category.color}}>
          <Link href={"/posts/categories/" + category.name}>
            <a>
              {field.category}
            </a>
          </Link>
        </li>
        {field.tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={getTag(it)} type="reference" />
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          a {
            color: #222;
            display: block;
            padding: 1rem;
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
          .tag-list {
            list-style: none;
            padding: 0;
            box-sizing: border-box;
            justify-content: right;
            display: flex;
          }
          .tag-list li {
            margin-left: 0.5rem;
            text-shadow: 1px 1px 3px #fff;
          }
          .tag-list li:first-of-type { width: 100%; }
        `}
      </style>
    </>
  );
}
