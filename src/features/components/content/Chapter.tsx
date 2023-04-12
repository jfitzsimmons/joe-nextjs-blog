/* eslint-disable react/jsx-props-no-spreading */
// import { AuthorContent } from "../lib/authors";
import React, { useRef } from 'react'
import Link from 'next/link'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
// import { serialize } from 'next-mdx-remote/serialize'
import { getCat } from '../../../common/utils/categories'
import styles from './Chapter.module.css'

type Props = {
  body: MDXRemoteSerializeResult
  title: string
  category: string
}
export default function Chapter({ body, title, category }: Props) {
  const cat = getCat(category)
  const catBtn = useRef(null)
  const styleObj = {
    backgroundColor: cat.color
      ? `rgba(${cat.color}.8)`
      : 'rgba(21, 132, 125, 0.2)',
  }
  function hoverBackground() {
    catBtn.current.style.backgroundColor = '#cbb8'
  }

  function dynamicBackground() {
    catBtn.current.style.backgroundColor = cat.color
      ? `rgba(${cat.color}.8)`
      : 'rgba(21, 132, 125, 0.2)'
  }
  return (
    <div className={`${styles.act}  ${styles[`act_${category}`]}`}>
      <h2>{title}</h2>
      {body && (
        <MDXRemote
          {...body}
          components={{}}
        />
      )}
      <Link href={`/posts/filter/categories/${cat.slug}`}>
        <a
          ref={catBtn}
          className={styles.cat_button}
          style={styleObj}
          onMouseOver={() => hoverBackground()}
          onFocus={() => hoverBackground()}
          onMouseLeave={() => dynamicBackground()}
          onBlur={() => dynamicBackground()}
        >
          {category}
        </a>
      </Link>
    </div>
  )
}
