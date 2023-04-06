import React from 'react'
import { Field, FieldContent } from '../../types'
import ReferenceItem from './ReferenceItem'
import Pagination from '../../../common/components/Pagination'
// import { TagContent } from '../common/utils/tags'
import { FilterContent } from '../../../common/types'
import styles from './FieldList.module.css'

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
  /** cat, tags,* */ pagination,
  field,
  tag,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <h1 className={styles.h1}>
          {!tag && 'all'} references / {tag && <span>{tag.name}</span>}
        </h1>
        <ul className={`${styles.ul} ${styles.post_list}`}>
          {fields.map((it) => (
            <li
              key={it.title}
              className={`${styles.li} ${styles.reference}`}
            >
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
                ? `/posts/field/${field.slug}`
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
      </ul> */}
    </div>
  )
}

FieldPostList.defaultProps = {
  tag: null,
}
