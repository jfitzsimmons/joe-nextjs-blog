import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";

import { listCats } from "../lib/categories";



export default function Navigation() {
  const categories = listCats();
  //console.log(categories);//
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={"container " + (active ? "active" : "")}>
        <ul className="card-dark">
          <li>
            <Link href="/">
              <a className={router.pathname === "/" ? "active" : null}>about</a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a
                className={
                  router.pathname.startsWith("/posts") ? "active" : null
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
                    router.pathname.startsWith(`/posts/categories/${it.slug}`) ? "active" : null
                  }
                >
                  {it.name}
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
              padding: 0;
              position: fixed;
              top: 0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              z-index: 1;
              transform: translateY(100%);
              transition: opacity 200ms;
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
                display: block;
              }
              ul {
                opacity: 1;
                width: 7rem;
                top: auto;
                display: flex;
                justify-content: center;
                transform: translateY(0);
                height: 100%;
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
