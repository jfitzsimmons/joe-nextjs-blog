/* eslint-disable react/jsx-props-no-spreading */
// import { AuthorContent } from "../lib/authors";
import React, { useRef } from 'react'
import Link from 'next/link'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { InstagramEmbed } from 'react-social-media-embed'
import YouTube from 'react-youtube'
import CodePen from 'react-codepen-embed'
import styles from './Chapter.module.css'
import { getCat } from '../../../common/utils/categories'

const components = { InstagramEmbed, YouTube, CodePen }

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
    <div className={`${styles.act}`}>
      <h2>{title}</h2>

      {body && (
        <div>
          <MDXRemote
            {...body}
            components={components}
          />
        </div>
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
