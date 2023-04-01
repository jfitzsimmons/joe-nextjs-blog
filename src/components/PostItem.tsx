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
            color: #ddd;
            display: block;
          }
          .description {
            margin-bottom: 3vmin;
            line-height: 1.5;
            color: #f5e5e7bb;
          }
          h2 {
            margin: .5vh 0 .8vh;
            font-weight: 500;
            font-size: 1.4em;
            letter-spacing: 1px;
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
            border-top: 1px solid #9f979788; 
            flex-wrap: wrap; 
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
