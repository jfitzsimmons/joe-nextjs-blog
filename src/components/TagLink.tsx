import Link from "next/link";
import { TagContent } from "../lib/tags";

type Props = {
  tag: TagContent;
  type?: string;
};
export default function Tag({ tag, type }: Props) {
  const href = (type && type === "reference") ? "/posts/field/tags/" : "/posts/tags/";
  return (
    <Link href={href + "[[...slug]]"} as={`${href}${tag.slug}`}>
      <a>{"#" + tag.name}</a>
    </Link>
  );
}
