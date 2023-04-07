import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Burger from './Burger'
import { listCats } from '../../../common/utils/categories'
import { listFields } from '../../utils/fields'
import Canvas from '../../../common/components/Canvas'
import mountainsAnimation from '../../../utils/mountains'
import styles from './Navigation.module.css'

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
    <nav className={styles.nav}>
      <Burger
        active={active}
        onClick={() => setActive(!active)}
      />
      <div className={styles.logo_container}>
        <Canvas
          draw={mountainsAnimation}
          height={150}
          width={120}
          fader={0}
          animation={false}
          instance="logo"
        />
        <Link href="/">
          <a className={styles.title_short}>
            <h1>
              Ins<span className="fancy">Eng</span>
            </h1>
          </a>
        </Link>
      </div>
      <div
        className={`card-dark ${styles.container}  ${
          active ? styles.active : ''
        }`}
      >
        <ul className={`${styles.ul} ${active ? 'card-dark' : ''}`}>
          {/** 
          <li>
            <Link href="/">
              <a className={router.pathname === '/' ? 'active' : ''}>about</a>
            </Link>
          </li> 
          */}
          <li className={styles.nav__link}>
            <Link href="/posts">
              <a
                className={`${styles.link} ${
                  router.pathname.endsWith('/posts') ? styles.active : ''
                }`}
              >
                blog
              </a>
            </Link>
          </li>
          {categories.map((it) => (
            <li
              key={it.slug}
              className={styles.nav__link}
            >
              <Link href={`/posts/filter/${it.slug}`}>
                <a
                  className={`${styles.link} ${
                    router.asPath.endsWith(`categories/${it.slug}`)
                      ? styles.active
                      : ''
                  }`}
                >
                  {it.color && (
                    <span
                      className={styles.bullet}
                      style={{ color: `rgba(${it.color}0.9)` }}
                    >
                      &nbsp;
                    </span>
                  )}
                  {it.name}
                </a>
              </Link>
            </li>
          ))}
          {fields.map((it) => (
            <li
              key={it.slug}
              className={styles.nav__link}
            >
              <Link href={`/posts/field/${it.slug}`}>
                <a
                  className={`${styles.link} ${
                    router.asPath.endsWith(`field/${it.slug}`)
                      ? styles.active
                      : ''
                  }`}
                >
                  {it.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.bottom_rail} card-dark`}>
        <button
          type="button"
          className={styles.to_top}
          onClick={() => topFunction()}
        >
          &#8679;
        </button>
      </div>
    </nav>
  )
}
