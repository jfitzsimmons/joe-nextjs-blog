import Link from "next/link";
import { FilterContent } from "../lib/categories";

type Props = {
  cat: FilterContent;
};
export default function CategoryButton({ cat }: Props) {
  return (
    <>
      <Link href={"/posts/categories/[[...slug]]"} as={`/posts/categories/${cat.slug}`}>
        <a>{cat.name}</a>
      </Link>
      <style jsx>{`
        a {
          display: inline-block;
          border-radius: 12px 0 0 12px;
          background-color: ${(cat.color) ? '#' + cat.color : 'rgba(21, 132, 125, 0.2)'};
          color: #222;
          transition: background-color 0.3s ease;
          padding: 0.25em 0.5em;
          writing-mode: sideways-lr;
          text-align: center;
        }
        a:active,
        a:hover {
          background-color: #9b9b9b;
          color: #fff;
        }
      `}</style>
    </>
  );
}
