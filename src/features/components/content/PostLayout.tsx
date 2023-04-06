import React, { useEffect, useRef, useState } from 'react'
import { parseISO } from 'date-fns'
// import Author from './Author'
import Copyright from './Copyright'
import Date from '../../../common/components/Date'
import Layout from '../layout/Layout'
import Chapter from './Chapter'
import BasicMeta from '../../../common/components/meta/BasicMeta'
import JsonLdMeta from '../../../common/components/meta/JsonLdMeta'
import OpenGraphMeta from '../../../common/components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../../common/components/meta/TwitterCardMeta'
import SocialList from '../../../common/components/SocialList'
import TagButton from '../../../common/components/TagButton'
// import { getAuthor } from '../../../_notes/authors'
import { getTag } from '../../../common/utils/tags'
import { getCat } from '../../../common/utils/categories'
import { Reference } from '../../types'
import Canvas from '../../../common/components/Canvas'
import { mountains } from '../../../utils/mountains'
import styles from './PostLayout.module.css'

// not using author TESTJPF

type Props = {
  title: string
  date: Date
  slug: string
  tags: string[]
  chapters: Array<Chapter>
  // author: string
  category: string
  description?: string
  references?: Reference[]
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
  // author,
  tags,
  chapters,
  references,
  category,
  description,
}: Props) {
  const keywords = tags.map((it) => getTag(it).name)
  // const authorName = getAuthor(author).name
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
        // author={authorName}
        description={description}
      />
      <div
        className={styles.tab}
        style={{ background: `rgba(${getCat(category).color}.8)` }}
      />
      <div className={styles.container}>
        <div className="post-card">
          <div className={styles.post}>
            <div
              className={styles.mountains}
              ref={div}
            >
              <header className={styles.header}>
                <div className={styles.metadata}>
                  <h1 className={styles.h1}>{title}</h1>
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
                instance="post"
              />
            </div>
            <article className={`card ${styles.article}`}>
              <div className={styles.content}>
                {chapters.map((it) => (
                  <Chapter
                    key={`${it.section.chapterTitle}`}
                    body={it.section.body}
                    title={it.section.chapterTitle}
                    category={it.section.category}
                  />
                ))}
              </div>
              <ul className={styles.tag_list}>
                {tags.map((it) => (
                  <li key={it}>
                    <TagButton tag={getTag(it)} />
                  </li>
                ))}
              </ul>
            </article>
          </div>
          {references && (
            <>
              <h3>References</h3>
              <ol className={`${styles.card} ${styles.ref_list} ${styles.ol}`}>
                {references.map((it) => (
                  <li key={it.title}>
                    <a
                      href={`#ref${it.index}`}
                      title={`go to reference for ${it.title}`}
                    >
                      ^
                    </a>{' '}
                    <a
                      href={it.url}
                      title={it.title}
                      className="ref-link"
                    >
                      {it.title}
                    </a>{' '}
                    <i>{it.source}</i> (
                    <Date date={parseISO(it.date)} />)
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
        <footer className={styles.footer}>
          <div className={`${styles.social_list} card-dark`}>
            <SocialList />
            <Copyright />
          </div>
        </footer>
      </div>
    </Layout>
  )
}

PostLayout.defaultProps = {
  description: '',
  references: [],
}
