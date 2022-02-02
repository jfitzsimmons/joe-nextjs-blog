import { PostContent } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import TagLink from "./TagLink";
import CategoryButton from "./CategoryButton";
import { getTag } from "../lib/tags";
import { getCat } from "../lib/categories";

type Props = {
  post: PostContent;
};

export default function PostItem({ post }: Props) {
  return (
    <>
      <CategoryButton cat={getCat(post.category)} />
      <div className="column">
        <Date date={parseISO(post.date)} />
        <Link href={"/posts/" + post.slug}>
          <a>
            <h2>{post.title}</h2>
          </a> 
        </Link>
        <div className="description">{post.description}</div>
        <ul className={"tag-list"}>
          {post.tags.map((it, i) => (
            <li key={i}>
              <TagLink tag={getTag(it)} />
            </li>
          ))}
        </ul>
      </div>
      <style jsx>
        {`
          a {
            color: #222;
            display: block;
          }
          .description {
            margin-bottom: 2vmin;
          }
          h2 {
            margin: 2vmin 0 0.5vmin;
            font-weight: 500;
          }
          .column {
            flex-direction: column;
            padding: 2vmin 4vmin;
            width: 100%;
          }
          .tag-list {
            display: flex;
            justify-content: end;
            font-weight: 400;
            
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
