import React from 'react';
import { FilterContent } from '../common/types'
import { PostContent } from '../features/types'
import '@testing-library/jest-dom'
import { fireEvent, render as rtlRender, screen } from '@testing-library/react'
import { postFilterStaticData } from './utils/testData'
import PostList, { Props } from '../features/components/lists/PostList'

/**
 * testjpf
 * use postlist instead with an import util of dummy data for
 * type === all
 * filter.slug === latest
 * also
 * type === categories ?/
 * type === tags???
 * i forget
 *
 * need to add attribute identifiers to utilize
 * expect(BLANK).toBeInTheDocument()
 */

/** 
const props: {
    posts: PostContent[]
    tags: FilterContent[]
    pagination: { current: number; pages: number }
    page?: string
    filterType: string
    filter?: FilterContent
  } = { postFilterStaticData.posts, postFilterStaticData.tags, postFilterStaticData.pagination, filterType }
  if (page) {
    props.page = page
  }
  if (filter) {
    props.filter = filter
  }
*/

type PostList as PostList
type StaticData = {
  posts: PostContent[]
  tags: FilterContent[]
  pagination: {
    current: number
    pages: number
  }
}

function renderLoginForm(props: Partial<Props> = {}): PostList{
  const defaultProps = {
    posts: [],
    tags: [],
    pagination: { current: 1, pages: 1 },
  }

  return rtlRender(
    <PostList
    {...defaultProps}
    {...props}
  />,
  )
}

