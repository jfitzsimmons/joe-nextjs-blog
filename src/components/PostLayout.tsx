import React, { useEffect, useRef, useState } from 'react'
import styles from '../../public/styles/content.module.css'
import Author from './Author'
import Copyright from './Copyright'
import Date from './Date'
import Layout from './Layout'
import Chapter from './Chapter'
import BasicMeta from './meta/BasicMeta'
import JsonLdMeta from './meta/JsonLdMeta'
import OpenGraphMeta from './meta/OpenGraphMeta'
import TwitterCardMeta from './meta/TwitterCardMeta'
import { SocialList } from './SocialList'
import TagButton from './TagButton'
import { getAuthor } from '../lib/authors'
import { getTag } from '../lib/tags'
import { getCat } from '../lib/categories'
import { Reference } from '../lib/posts'
import { parseISO } from 'date-fns'
import Canvas from './Canvas'
import { mountains } from '../utils/mountains'

type Props = {
  title: string
  date: Date
  slug: string
  tags: string[]
  chapters: Array<Chapter>
  author: string
  category: string
  description?: string
  references?: Reference[]
  children: React.ReactNode
}
type Chapter = {
  section?: {
    body: string
    chapterTitle: string
    category: string
  }
}

export default function PostLayout({
  title,
  date,
  slug,
  author,
  tags,
  chapters,
  references,
  category,
  description,
}: Props) {
  const keywords = tags.map((it) => getTag(it).name)
  const authorName = getAuthor(author).name
  const div = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (div.current) setWidth(div.current.offsetWidth)
  }, [])
  return (
    <Layout>
      <BasicMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        description={description}
      />
      <TwitterCardMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <div
        className="tab"
        style={{ background: 'rgba(' + getCat(category).color + '.6)' }}
      ></div>
      <div className={'container'}>
        <div className={'post-card'}>
          <div className="post">
            <div className="mountains" ref={div}>
              <header>
                <div className={'metadata'}>
                  <h1>{title}</h1>
                  <div>
                    <Date date={date} />
                  </div>
                </div>
              </header>
              <Canvas
                draw={mountains}
                height={200}
                width={width}
                fader={0}
                animation={false}
                instance={'post'}
              />
            </div>
            <article className={'card'}>
              <div className={styles.content}>
                {chapters.map((it, i) => (
                    <Chapter
                    key={i}
                      body={it.section.body}
                      title={it.section.chapterTitle}
                      category={it.section.category}
                    />
                ))}
              </div>
              <ul className={'tag-list'}>
                {tags.map((it, i) => (
                  <li key={i}>
                    <TagButton tag={getTag(it)} />
                  </li>
                ))}
              </ul>
            </article>
          </div>
          {references && (
            <>
              <h3>References</h3>
              <ol className={'ref-list card'}>
                {references.map((it, i) => (
                  <li key={i}>
                    <a
                      href={'#ref' + it.index}
                      title={'go to reference for ' + it.title}
                    >
                      ^
                    </a>{' '}
                    <a href={it.url} title={it.title} className="ref-link">
                      {it.title}
                    </a>{' '}
                    <i>{it.source}</i> (<Date date={parseISO(it.date)} />)
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
        <footer>
          <div className="social-list card-dark">
            <SocialList />
            <Copyright />
          </div>
        </footer>
      </div>
      <style jsx>
        {`
          .tab {
            height: 2vmin;
            width: 100%;
            border-radius: 0 0 4vmin 4vmin;
          }
          .container {
            display: block;
            max-width: 66rem;
            width: 100%;
            margin: 0 auto;
            padding: 4vmin 0;
            box-sizing: border-box;
            z-index: 0;
          }
          .post {
            box-shadow: 0 0 25px 1px rgba(211, 184, 196, 0.3),
              inset 0 0 40px 0px rgba(11, 4, 6, 0.05),
              0.7vmin -0.7vmin 1vmin 0 rgba(11, 4, 6, 0.1);
            border-radius: 4vmin;
          }
          .metadata div {
            display: inline-block;
            margin-right: 0.5rem;
            width: 100%;
            text-align: right;
            text-shadow: 0 0 0.1vmin #000;
          }
          article {
            flex: 1 0 auto;
            padding: 2vmin 4vmin;
            box-shadow: 0 0 25px 1px rgba(211, 184, 196, 0.3),
              inset 0 0 40px 0px rgba(11, 4, 6, 0.05),
              0.7vmin -0.7vmin 1vmin 0 rgba(11, 4, 6, 0.1);
            border-radius: 0 0 4vmin 4vmin;
          }
          .mountains {
            height: 200px;
            position: relative;
            box-sizing: border-box;
            box-shadow: 0 0 1vmin 0 rgba(11, 4, 6, 0.1);
            border-radius: 4vmin;
          }
          header {
            z-index: 1;
            position: absolute;
            bottom: 2vmin;
            left: 0;
            padding: 0 4vmin;
            color: #fff;
          }
          h1 {
            margin: 0;
            text-shadow: -1px 0 2px #0b040677, 0 0 1vmin #1007;
            font-size: calc(1.5rem + 2vmin);
          }
          h3 {
            text-shadow: -1px 0 2px rgb(253, 247, 247);
          }
          .tag-list {
            list-style: none;
            text-align: right;
            margin: 1.75rem 0 0 0;
            padding: 0;
            border-top: 1px solid #9f979788;
          }
          .tag-list li {
            display: inline-block;
            margin-left: 0.5rem;
          }
          .ref-list {
            padding: 4vmin;
            box-shadow: 0 0 25px 1px rgba(211, 184, 196, 0.3),
              inset 0 0 40px 0px rgba(11, 4, 6, 0.05),
              0.7vmin -0.7vmin 1vmin 0 rgba(11, 4, 6, 0.1);
          }
          .ref-list li {
            margin: 0 0 0.5rem 1rem;
          }
          .ref-link {
            color: rgba(1, 88, 123, 0.8);
          }
          .social-list {
            margin-top: 3rem;
            text-align: center;
            width: fit-content;
            box-shadow: 0 0 25px 1px rgba(211, 184, 196, 0.3),
              inset 0 0 40px 0px rgba(11, 4, 6, 0.05),
              0.7vmin -0.7vmin 1vmin 0 rgba(11, 4, 6, 0.1);
            padding: 4vmin;
            border-radius: 4vmin;
          }
          footer {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @media (min-width: 769px) and (min-height: 580px) {
            ol {
              margin: 0;
            }
            .container {
              display: flex;
              flex-direction: column;
            }
          }
        `}
      </style>
      <style global jsx>
        {`
          /* Syntax highlighting */
          .hljs-comment,
          .hljs-prolog,
          .hljs-doctype,
          .hljs-cdata,
          .hljs-plain-text {
            color: #6a737d;
          }

          .hljs-atrule,
          .hljs-attr-value,
          .hljs-keyword,
          .hljs-operator {
            color: #f92672;
          }

          .hljs-property,
          .hljs-name,
          .hljs-boolean,
          .hljs-constant,
          .hljs-symbol,
          .hljs-deleted {
            color: #f92672;
          }

          .hljs-number {
            color: #ae81ff;
          }

          .hljs-selector,
          .hljs-attr,
          .hljs-string,
          .hljs-char,
          .hljs-builtin,
          .hljs-inserted {
            color: #e6db74;
          }

          .hljs-function,
          .hljs-class-name {
            color: #f8f8f2;
          }

          /* language-specific */

          /* JSX */
          .lang-javascript .hljs-punctuation,
          .lang-javascript .hljs-tag .hljs-punctuation,
          .lang-javascript .hljs-tag .hljs-script,
          .lang-javascript .hljs-plain-text {
            color: #24292e;
          }

          .lang-javascript .hljs-tag .hljs-attr {
            color: #f8f8f2;
          }

          .lang-javascript .hljs-tag .hljs-class-name {
            color: #005cc5;
          }

          .lang-javascript .hljs-tag .hljs-script-punctuation,
          .lang-javascript .hljs-attr-value .hljs-punctuation:first-child {
            color: #f92672;
          }

          .lang-javascript .hljs-attr-value {
            color: #032f62;
          }

          .lang-javascript span[class='comment'] {
            color: pink;
          }

          /* HTML */
          .language-html .hljs-tag .hljs-punctuation {
            color: #24292e;
          }

          .language-html .hljs-tag .hljs-attr {
            color: #f8f8f2;
          }

          .language-html .hljs-tag .hljs-attr-value,
          .language-html
            .hljs-tag
            .hljs-attr-value
            .hljs-punctuation:not(:first-child) {
            color: #032f62;
          }

          /* CSS */
          .language-css .hljs-selector {
            color: #f8f8f2;
          }

          .language-css .hljs-property {
            color: #005cc5;
          }
        `}
      </style>
    </Layout>
  )
}
