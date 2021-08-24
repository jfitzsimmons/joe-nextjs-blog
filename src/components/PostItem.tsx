import { PostContent } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  post: PostContent;
};

export default function PostItem({ post }: Props) {
  return (
    <>
      <Link href={"/posts/" + post.slug}>
        <a>
          <Date date={parseISO(post.date)} />
          <h2>{post.title}</h2>
        </a>
      </Link>
      <Link href={"/categories/" + post.category}>
        <a className="category-link">
          {post.category}
        </a>
      </Link>
      <style jsx>
        {`
          a {
            color: #222;
            display: block;
          }
          .category-link {
            float: right;
          }
          h2 {
            margin: 0;
            font-weight: 500;
          }
        `}
      </style>
    </>
  );
}
