import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";
import { listCats } from "../lib/categories";
import { listFields } from "../lib/fields";
import Canvas from "./Canvas";
import { mountains } from "../utils/mountains";

export default function Navigation() {
  const categories = listCats();
  const fields = listFields();
  const router = useRouter();
  const [active, setActive] = useState(false);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  } 

  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div style={{color: "white"}} className="logo-container">
        <Canvas draw={mountains} height={150} width={114} fader={0} animation={false} instance={"logo"}/>
        <Link href="/">
          <a className="title-short">
            <h1>
              In<span className="fancy">En</span>
            </h1>
          </a>
        </Link>
      </div>
      <div className={"card-dark container  " + (active ? "active" : "")}>
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
                  {(it.color) && <span className="bullet" style={{ color: 'rgba('+it.color+'1)' }}>&nbsp;</span> }{it.name}
                </a>
              </Link>
            </li>
          ))}
          {fields.map((it, i) => (
            <li key={i}>
              <Link href={`/posts/field/${it.slug}`}>
                <a
                  className={
                    router.asPath.endsWith(`field/${it.slug}`) ? "active" : null
                  }
                >
                  {it.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bottom-rail card-dark">
        <a className="to-top" onClick={() => topFunction()}>&#8679;</a>
      </div>
      <style jsx>
        {`
          a {
            display: flex;
            justify-content: end;
          }
          .logo-container {
            height: 150px;
          }
          .container {
            width: 0;
          }
          .title-short {
            z-index: 1;
            position: absolute;
            font-weight: 500;
            top: 5rem;
            right: 1rem;
            margin: 0;
            text-align: right;
            color: #fff;
            width: 100%;
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
          .bullet::before {
            content:"${String.fromCharCode(10041)}";
          }
          .active, a:hover {
            color: #DDD;
          }
          .bottom-rail {
            flex: 1;
          }
          .to-top, .logo-container  {
            display: none;
          }
          @media (min-width: 769px) {
            .container {
              width: 112px;
              display: flex;
              align-items: center;
              min-height: calc(100vh - 150px);
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
            .logo-container {
              display: block;
            }
            .to-top {
              position: sticky;
              top: 1rem;
              text-align: center;
              display: block;
              font-size: 4rem;
            }
          }
        `}
      </style>  
    </>
  );
}
