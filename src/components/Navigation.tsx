import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";
import { listCats } from "../lib/categories";

export default function Navigation() {
  const categories = listCats();
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={"container  " + (active ? "active" : "")}>
        <ul className={(active ? "card-dark" : "")}>
          <li>
            <Link href="/">
              <a className={router.pathname === "/" ? "active" : null}>about</a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a
                className={
                  router.pathname.endsWith("/posts") ? "active" : null
                }
              >
                blog
              </a>
            </Link>
          </li>
          {categories.map((it, i) => (
            <li key={i}>
              <Link href={`/posts/categories/${it.slug}`}>
                <a
                  className={
                    router.asPath.endsWith(`categories/${it.slug}`) ? "active" : null
                  }
                >
                  {(it.color) && <span style={{ color: '#'+it.color }}> &bull; </span> }{it.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>
          {`
            .container {
              width: 0;
            }
            ul {
              opacity: 0;
              width: 100%;
              text-align: right;
              list-style: none;
              margin: 0;
              padding: 1rem;
              position: fixed;
              top: 0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              z-index: 3;
              transform: translateY(100%);
              transition: opacity 200ms;
              box-sizing: border-box;
            }
            .active ul {
              opacity: 1;
              transform: translateY(0);
            }
            li {
              margin-bottom: 1.75rem;
              font-size: 2rem;
              padding: 0 1.5rem 0 0;
            }
            li:last-child {
              margin-bottom: 0;
            }
            .active, a:hover {
              color: #DDD;
            }
            @media (min-width: 769px) {
              .container {
                width: 7rem;
                display: flex;
                align-items: center;
                min-height: 100vh;
              }
              ul {
                opacity: 1;
                width: 7rem;
                position: sticky;
                top: 0;
                display: flex;
                justify-content: center;
                transform: translateY(0);
              }
              li {
                font-size: 1rem;
                padding: 0;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}
