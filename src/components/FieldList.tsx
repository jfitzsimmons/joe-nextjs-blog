import React from 'react'
import { Field } from '../lib/posts'
import { FieldContent } from '../lib/fields'
import ReferenceItem from './ReferenceItem'
import Pagination from './Pagination'
import { TagContent } from '../lib/tags'
import { FilterContent } from '../lib/categories'

type Props = {
  fields: Field[]
  field: FieldContent
  tag?: FilterContent
  pagination: {
    current: number
    pages: number
  }
}
export default function FieldPostList({
  fields,
  /**cat, tags,**/ pagination,
  field,
  tag,
}: Props) {
  return (
    <div className={'container'}>
      <div className={'posts'}>
        <h1>All references / {tag && <span>{tag.name}</span>}</h1>
        <ul className={'post-list'}>
          {fields.map((it, i) => (
            <li key={i} className="reference">
              <ReferenceItem field={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: () => '/posts/field/[[...slug]]',
            as: (page) =>
              page === 1
                ? '/posts/field/' + field.slug
                : `/posts/field/${field.slug}/${page}`,
          }}
        />
      </div>
      {/** 
      <ul className={"categories card"}>
        {tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>*/}
      <style jsx>
        {`
          .container {
            display: flex;
            margin: 0 auto;
            width: 100%;
            justify-content: space-around;
            align-items: center;
            padding: 4vmin 0;
          }
          h1 {
            margin: 0 0 2rem;
            padding: 0;
            font-weight: 100;
            font-size: 1.75rem;
            color: #feec;
            text-shadow: 1px 2px 2px #100e;
            text-shadow: 1px 1px 5px #000;
          }
          h1 span {
            font-weight: bold;
            color: #feee;
          }
          ul {
            margin: 0;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(46vmin, 1fr));
            grid-gap: 4vmin;
          }
          li {
            list-style: none;
          }
          .posts {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
          }
          .posts li {
            margin-bottom: 1.5rem;
          }
          .reference {
            border-radius: 4vmin;
          }
          .categories {
            display: none;
          }
          .categories li {
            margin-bottom: 0.75em;
          }
          @media (min-width: 769px) and (min-height: 580px) {
            h1 {
              font-size: 2rem;
            }
            .categories {
              padding: 1rem;
              display: flex;
              flex-direction: column;
              max-height: 250px;
              flex-wrap: wrap;
              flex-direction: row;
              max-height: 300px;
              -webkit-flex-wrap: wrap;
              writing-mode: sideways-lr;
              margin-left: 1.5rem;
            }
          }
        `}
      </style>
    </div>
  )
}
