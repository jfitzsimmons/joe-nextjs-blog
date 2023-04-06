// import { AuthorContent } from "../lib/authors";
import React from 'react'
// testjpf todo: import { getCat } from "../../../common/utils/categories";
import styles from './Chapter.module.css'
/** 
 * testjpf add this logic to DOM
background-color: ${getCat(category).color ? `rgba(${  getCat(category).color  }.8)` : 'rgba(21, 132, 125, 0.2)'};

*/
type Props = {
  body: string
  title: string
  category: string
}
export default function Chapter({ body, title, category }: Props) {
  return (
    <div className={`${styles.act}  ${styles[`act_${category}`]}`}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      {/** testjpf get cat util for this link
       * <a className="cat-button" href="">{category}</a> */}
    </div>
  )
}
