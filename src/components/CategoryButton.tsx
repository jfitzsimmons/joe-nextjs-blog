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
          border-radius: 0 4vmin 4vmin 0 ;
          background-color: ${(cat.color) ? 'rgba(' + cat.color + '.8)' : 'rgba(21, 132, 125, 0.2)'};
          color: #211;
          transition: background-color 0.3s ease;
          padding: 0.25em 0.5em;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-align: center;
          text-shadow: 0px 0px 2px #fee8
        }
        a:active,
        a:hover {
          background-color: #feec; 
          text-shadow: 0 0 2px #1008;
          color: #fff;
        }
      `}</style>
    </>
  );
}