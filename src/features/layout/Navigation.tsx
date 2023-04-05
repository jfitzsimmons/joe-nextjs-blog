import Link from 'next/link'
import { useRouter } from 'next/router'
import Burger from './Burger'
import { useState } from 'react'
import { listCats } from '../../common/utils/categories'
import { listFields } from '../../lib/fields'
import Canvas from '../../common/components/Canvas'
import { mountains } from '../../utils/mountains'

export default function Navigation() {
  const categories = listCats()
  const fields = listFields()
  const router = useRouter()
  const [active, setActive] = useState(false)

  function topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className="logo-container">
        <Canvas
          draw={mountains}
          height={150}
          width={120}
          fader={0}
          animation={false}
          instance={'logo'}
        />
        <Link href="/">
          <a className="title-short">
            <h1>
              Ins<span className="fancy">Eng</span>
            </h1>
          </a>
        </Link>
      </div>
      <div className={'card-dark container  ' + (active ? 'active' : '')}>
        <ul className={active ? 'card-dark' : ''}>
          <li>
            <Link href="/">
              <a className={router.pathname === '/' ? 'active' : null}>about</a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a
                className={router.pathname.endsWith('/posts') ? 'active' : null}
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
                    router.asPath.endsWith(`categories/${it.slug}`)
                      ? 'active'
                      : null
                  }
                >
                  {it.color && (
                    <span
                      className="bullet"
                      style={{ color: 'rgba(' + it.color + '0.9)' }}
                    >
                      &nbsp;
                    </span>
                  )}
                  {it.name}
                </a>
              </Link>
            </li>
          ))}
          {fields.map((it, i) => (
            <li key={i}>
              <Link href={`/posts/field/${it.slug}`}>
                <a
                  className={
                    router.asPath.endsWith(`field/${it.slug}`) ? 'active' : null
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
        <a className="to-top" onClick={() => topFunction()}>
          &#8679;
        </a>
      </div>
      <style jsx>
        {`
          a {
            display: flex;
            justify-content: end;
            text-shadow: 1px 2px 2px #000e;
            transition: 200ms;
            position: absolute;
          }
          a:hover,
          a.active {
            transition: 200ms;
          }
          h1 {
          }
          .logo-container {
            height: 150px;
          }
          .container.active {
            width: 100%;
            position: fixed;
            top: 0;
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
          .title-short h1 {
            transition: 200ms;
            font-size: 1.5rem;
          }
          .title-short:hover {
            padding: 1vh 4vh;
            top: 7rem;
            box-shadow: 0 0 25px 1px rgba(211, 184, 196, 0.3),
              inset 0 0 40px 0px rgba(11, 4, 6, 0.1),
              0.7vmin -0.7vmin 1vmin 0 rgba(11, 4, 6, 0.1);
          }
          .title-short:hover h1 {
            transition: 200ms;
            font-size: 1.7rem;
          }
          ul {
            border-radius: 0 0 0 4vmin;
            opacity: 0;
            width: 240px;
            text-align: right;
            list-style: none;
            margin: 0;
            padding: 1rem;
            position: fixed;
            top: 0;
            display: none;
            flex-direction: column;
            justify-content: space-around;
            z-index: 3;
            right: 0;
            transition: opacity 200ms;
            box-sizing: border-box;
            max-height: 400px;
            height: 100vh;
          }
          .active ul {
            display: flex;
            opacity: 1;
          }
          li {
            flex: 1;
            font-size: 2rem;
            padding: 0 1.5rem 0 0;
            align-items: center;
            justify-content: end;
            display: flex;
          }
          .bullet::before {
            content: '${String.fromCharCode(10041)}';
          }
          .active,
          a:hover {
            color: #feee;
          }
          .bottom-rail {
            flex: 1;
          }
          .to-top,
          .logo-container {
            display: none;
          }
          @media (min-width: 769px) and (min-height: 580px) {
            a:hover,
            a.active {
              font-size: 1.2rem;
              padding: 2vh 0;
            }
            .container {
              display: flex;
              align-items: center;
              min-height: calc(100vh - 150px);
              box-sizing: border-box;
              box-shadow: 0 0 60px 10px rgba(11, 4, 6, 0.5);
            }
            ul {
              box-shadow: 15px -5px 25px 1px rgba(211, 184, 196, 0.2), inset 10px 10px 30px 15px rgba(11, 4, 6, 0.6);
              opacity: 1;
              width: 7rem;
              position: sticky;
              top: 0;
              display: flex;
              justify-content: center;
              transform: translateY(0);
              border-radius: 0 4vmin 4vmin 0;
              margin: 4vmin 0;
              transition: box-shadow .2s
            }
            ul:hover {
              box-shadow: 15px -5px 25px 1px rgba(211, 184, 196, 0.3), inset 10px 10px 40px 20px rgba(11, 4, 6, 0.8);

            }
            ul:active {
              box-shadow: 5px -5px 5px 0px rgba(211, 184, 196, 0.2), inset 10px 10px 40px 20px rgba(11, 4, 6, 0.9);

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
  )
}
