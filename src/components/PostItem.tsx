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
        <Link href={"/posts/" + post.slug}>
          <a>
            <Date date={parseISO(post.date)} />
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
            margin-bottom: 1rem;
          }
          h2 {
            margin: 0;
            font-weight: 500;
          }
          .column {
            flex-direction: column;
            padding: 4vmin;
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
