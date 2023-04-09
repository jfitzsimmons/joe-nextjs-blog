import React, { useRef } from 'react'
import Link from 'next/link'
import { parseISO } from 'date-fns'
import { Field } from '../../types'
import Date from '../../../common/components/Date'
import TagLink from '../../../common/components/TagLink'
import { getTag } from '../../../common/utils/tags'
import { getCat } from '../../../common/utils/categories'
import styles from './ReferenceItem.module.css'

type Props = {
  field: Field
}

export default function ReferenceItem({ field }: Props) {
  const category = getCat(field.category)
  const catBtn = useRef(null)
  const styleObj = {
    backgroundColor: category.color
      ? `rgba(${category.color}.8)`
      : 'rgba(21, 132, 125, 0.2)',
  }
  function hoverBackground() {
    catBtn.current.style.backgroundColor = '#cbb8'
  }
  function dynamicBackground() {
    catBtn.current.style.backgroundColor = category.color
      ? `rgba(${category.color}.8)`
      : 'rgba(21, 132, 125, 0.2)'
  }
  return (
    <>
      <Link href={field.reference.url}>
        <a>
          <span className={`card ${styles.span} ${styles.top}`}>
            <span className={styles.title}>{field.reference.title}</span> |{' '}
            {field.reference.source} |{' '}
            <Date date={parseISO(field.reference.date)} />
          </span>
        </a>
      </Link>
      <Link href={`/posts/${field.url}`}>
        <a>
          <span className={`card-dark ${styles.span} ${styles.bottom}`}>
            {field.title} | <Date date={parseISO(field.date)} />
          </span>
        </a>
      </Link>
      <ul className={`${styles.tag_list} ${styles.ul}`}>
        <li className={`card ${styles.li}`}>
          <Link href={`/posts/field/filter/${category.name}`}>
            <a>
              <span
                ref={catBtn}
                className={styles.category_link}
                style={styleObj}
                onMouseOver={() => hoverBackground()}
                onFocus={() => hoverBackground()}
                onMouseLeave={() => dynamicBackground()}
                onBlur={() => dynamicBackground()}
              >
                {field.category}
              </span>
            </a>
          </Link>
        </li>
        <li className="card">
          <ul className={`${styles.tag_item} ${styles.ul}`}>
            {field.tags.map((it) => (
              <li
                key={it}
                className={styles.tag_item__tag}
              >
                <TagLink
                  tag={getTag(it)}
                  type="reference"
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  )
}
