import React, { useRef } from 'react'
import Link from 'next/link'
import { FilterContent } from '../../../common/types'
import styles from './CategoryButton.module.css'
// background-color: ${(cat.color) ? `rgba(${  cat.color  }.8)` : 'rgba(21, 132, 125, 0.2)'};
// testjpf style thing above again
type Props = {
  cat: FilterContent
}
export default function CategoryButton({ cat }: Props) {
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
    <Link
      href="/posts/categories/[[...slug]]"
      as={`/posts/categories/${cat.slug}`}
    >
      <span
        ref={catBtn}
        className={styles.span}
        style={styleObj}
        onMouseOver={() => hoverBackground()}
        onFocus={() => hoverBackground()}
        onMouseLeave={() => dynamicBackground()}
        onBlur={() => dynamicBackground()}
      >
        {cat.name}
      </span>
    </Link>
  )
}
