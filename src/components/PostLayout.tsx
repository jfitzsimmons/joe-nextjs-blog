import React from "react";
import styles from "../../public/styles/content.module.css";
import Author from "./Author";
import Copyright from "./Copyright";
import Date from "./Date";
import Layout from "./Layout";
import Chapter from "./Chapter";
import BasicMeta from "./meta/BasicMeta";
import JsonLdMeta from "./meta/JsonLdMeta";
import OpenGraphMeta from "./meta/OpenGraphMeta";
import TwitterCardMeta from "./meta/TwitterCardMeta";
import { SocialList } from "./SocialList";
import TagButton from "./TagButton";
import { getAuthor } from "../lib/authors";
import { getTag } from "../lib/tags";

type Props = {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  chapters: Array<Chapter>;
  author: string;
  description?: string;
  children: React.ReactNode;
};
type Chapter =  {
  body: string,
  chapterTitle: string,
  category: string,
}
export default function PostLayout({
  title,
  date,
  slug,
  author,
  tags,
  chapters,
  description = "",
  children,
}: Props) {
  const keywords = tags.map(it => getTag(it).name);
  const authorName = getAuthor(author).name;
  //console.dir(chapters);
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
      <div className={"container"}>
        <article className={"card"}>
          <header>
            <h1>{title}</h1>
            <div className={"metadata"}>
              <div>
                <Date date={date} />
              </div>
              <div>
                <Author author={getAuthor(author)} />
              </div>
            </div>
          </header>
          {/**<div className={styles.content}>{children}</div>
           * 
           * 
           * .section. is a limitiation with CMS "types"
           * 
           * **/}
          <div className={styles.content}>
            {chapters.map((it, i) => (
              <div key={i}>
                <Chapter 
                  body={it.section.body} 
                  title={it.section.chapterTitle}
                  category={it.section.category}
                />
              </div>
            ))}
          </div>
          <ul className={"tag-list"}>
            {tags.map((it, i) => (
              <li key={i}>
                <TagButton tag={getTag(it)} />
              </li>
            ))}
          </ul>
        </article>
        <footer>
          <div className={"social-list"}>
            <SocialList />
          </div>
          <Copyright />
        </footer>
      </div>
      <style jsx>
        {`
            .container {
              display: block;
              max-width: 66rem;
              width: 100%;
              margin: 0 auto;
              padding: 0 1.5rem;
              box-sizing: border-box;
              z-index: 0;
            }
            .metadata div {
              display: inline-block;
              margin-right: 0.5rem;
            }
            article {
              flex: 1 0 auto;
            }
            h1 {
              margin: 0 0 0.5rem;
              font-size: 2.25rem;
            }
            .tag-list {
              list-style: none;
              text-align: right;
              margin: 1.75rem 0 0 0;
              padding: 0;
            }
            .tag-list li {
              display: inline-block;
              margin-left: 0.5rem;
            }
            .social-list {
              margin-top: 3rem;
              text-align: center;
            }

            @media (min-width: 769px) {
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
              color: #d73a49;
            }

            .hljs-property,
            .hljs-tag,
            .hljs-boolean,
            .hljs-number,
            .hljs-constant,
            .hljs-symbol,
            .hljs-deleted {
              color: #22863a;
            }

            .hljs-selector,
            .hljs-attr,
            .hljs-string,
            .hljs-char,
            .hljs-builtin,
            .hljs-inserted {
              color: #032f62;
            }

            .hljs-function,
            .hljs-class-name {
              color: #6f42c1;
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
              color: #6f42c1;
            }

            .lang-javascript .hljs-tag .hljs-class-name {
              color: #005cc5;
            }

            .lang-javascript .hljs-tag .hljs-script-punctuation,
            .lang-javascript .hljs-attr-value .hljs-punctuation:first-child {
              color: #d73a49;
            }

            .lang-javascript .hljs-attr-value {
              color: #032f62;
            }

            .lang-javascript span[class="comment"] {
              color: pink;
            }

            /* HTML */
            .language-html .hljs-tag .hljs-punctuation {
              color: #24292e;
            }

            .language-html .hljs-tag .hljs-attr {
              color: #6f42c1;
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
              color: #6f42c1;
            }

            .language-css .hljs-property {
              color: #005cc5;
            }
          `}
      </style>
    </Layout>
  );
}
