import { PostContent } from "../../lib/posts";
import Date from "../../common/components/Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import TagLink from "../../common/components/TagLink";
import CategoryButton from "./CategoryButton";
import { getTag } from "../../common/utils/tags";
import { getCat } from "../../common/utils/categories";

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
            color: #feee;
            display: block;
          }
          .description {
            margin-bottom: 3vmin;
            line-height: 1.5;
            color: #feec;
            letter-spacing: 1px;
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
            text-shadow: 3px 3px 2px #0008;
          }
          .tag-list {
            display: flex;
            justify-content: end;
            font-weight: 400;
            border-top: 1px solid #cbb8; 
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
