import Link from "next/link";
import { TagContent } from "../lib/tags";

type Props = {
  tag: TagContent;
};
export default function TagButton({ tag }: Props) {
  return (
    <>
      <Link href={"/posts/tags/[[...slug]]"} as={`/posts/tags/${tag.slug}`}>
        <a className="tag">#{tag.name}</a>
      </Link>
      <style jsx>
        {`
          .tag {
            text-shadow: 0 0 1px #fff;
            font-family: Cambria, "Hoefler Text", Utopia, "Liberation Serif", "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif;
          }
        `}
      </style>
    </>
  );
}
