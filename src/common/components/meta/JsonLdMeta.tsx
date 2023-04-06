import React from 'react'
import { BlogPosting } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import { formatISO } from 'date-fns'
import Head from 'next/head'
import config from '../../utils/config'

type Props = {
  url: string
  title: string
  keywords?: string[]
  date: Date
  author?: string
  image?: string
  description?: string
}

export default function JsonLdMeta({
  url,
  title,
  keywords,
  date,
  author,
  image,
  description,
}: Props) {
  return (
    <Head>
      <script
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...jsonLdScriptProps<BlogPosting>({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: config.base_url + url,
          headline: title,
          keywords: keywords ? undefined : keywords.join(','),
          datePublished: formatISO(date),
          author,
          image,
          description,
        })}
      />
    </Head>
  )
}

JsonLdMeta.defaultProps = {
  description: '',
  keywords: ['Insincere', 'Engineer'],
  author: '',
  image: '',
}
