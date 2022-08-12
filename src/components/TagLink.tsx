import Link from "next/link";
import { TagContent } from "../lib/tags";

type Props = {
  tag: TagContent;
  type?: string;
};
export default function Tag({ tag, type }: Props) {
  const href = (type && type === "reference") ? "/posts/field/tags/" : "/posts/tags/";
  return (
    <><Link href={href + "[[...slug]]"} as={`${href}${tag.slug}`}>
      <a className="tag">{"#" + tag.name}</a>
    </Link><style jsx>
        {`.tag {
          text-shadow: 0 0 1px #fff;
          font-family: Cambria, "Hoefler Text", Utopia, "Liberation Serif", "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif;
              }`}
      </style></>
  );
}