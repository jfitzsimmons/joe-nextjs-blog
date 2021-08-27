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
  return (
    <>
      <Link href={field.reference.url}>
        <a className="card top" >
          <span style={{fontWeight: 500}}>{field.reference.title}</span> | {field.reference.source} | <Date date={parseISO(field.reference.date)} />
        </a> 
      </Link>
      {/**<CategoryButton cat={getCat(field.category)} />**/}
      <Link href={"/posts/" + field.url}>
        <a className="card-dark bottom" style={{color: "white", textAlign:"right"}}>
          {field.title} | <Date date={parseISO(field.date)} />
        </a> 
      </Link>
      <style jsx>
        {`
          a {
            color: #222;
            display: block;
            padding: 1rem;
          }
          .bottom {
            border-radius: 12px;
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
            display: inline;
          }
          .tag-list li {
            display: inline-block;
            margin-right: 0.5rem;
          }
        `}
      </style>
    </>
  );
}
