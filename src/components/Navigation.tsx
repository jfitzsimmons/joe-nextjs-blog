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
      <div className="logo-container">
        <Canvas draw={mountains} height={150} width={120} fader={0} animation={false} instance={"logo"}/>
        <Link href="/">
          <a className="title-short">
            <h1>
              Ins<span className="fancy">Eng</span>
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
                  {(it.color) && <span className="bullet" style={{ color: 'rgba('+it.color+'0.9)' }}>&nbsp;</span> }{it.name}
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
            text-shadow: 0 0 .1vmin #000;
            transition: 200ms;
          }
          a:hover,
          a.active {
            padding: 2vh 0;
            transition: 200ms;
            font-size: 1.1rem;
          }
          h1 {
          }
          .logo-container {
            height: 150px;
          }
          .container {
            width: 100%;
          }
          .title-short {
            z-index: 1;
            position: absolute;
            font-weight: 500;
            top: 7.6rem;
            margin: 0;
            text-align: right;
            background-color: rgba(11, 4, 6, 0.3);
            border-radius: 0 4vmin 4vmin 0;
            padding: 0 20px;
          }
          .title-short h1{
            transition: 200ms;
            font-size: 1.5rem;
          }
          .title-short:hover {
            padding: 1vh 4vh;
            top: 7rem;
            box-shadow: 0 0 30px 10px rgba(211, 184, 196, .3), inset 0 0 40px 0px rgba(11, 4, 6, 0.1), 0.7vmin -.7vmin 1vmin 0 rgba(11, 4, 6, 0.1);
          }
          .title-short:hover h1{
            transition: 200ms;
            font-size: 1.7rem;
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
            justify-content: space-around;
            z-index: 3;
            transform: translateY(100%);
            transition: opacity 200ms;
            box-sizing: border-box;
            min-height: 226px;
            height: 50vh;
          }
          .active ul {
            opacity: 1;
            transform: translateY(0);
          }
          li {
           flex:1;
            font-size: 2rem;
            padding: 0 1.5rem 0 0;
            align-items: center;
            justify-content: end;
            display: flex;
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
              display: flex;
              align-items: center;
              min-height: calc(100vh - 150px);
              box-sizing: border-box;
              box-shadow:0 0 60px 10px rgba(11, 4, 6, 0.5),
            }
            ul {
              box-shadow: 20px -10px 40px 3px rgba(211, 184, 196, 0.2), inset 10px 10px 40px 0px rgba(11, 4, 6, 0.6);
              opacity: 1;
              width: 7rem;
              position: sticky;
              top: 0;
              display: flex;
              justify-content: center;
              transform: translateY(0);
              border-radius: 0 4vmin 4vmin 0;
              margin: 4vmin 0;
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
            .to-top:hover {
              font-size: 4rem;
              padding: 0;
            }
          }
        `}
      </style>  
    </>
  );
}
