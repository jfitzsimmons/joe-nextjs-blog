import React from 'react'
import Head from 'next/head'
import config from '../../utils/config'

type Props = {
  url: string
  title?: string
  description?: string
}
export default function TwitterCardMeta({ url, title, description }: Props) {
  return (
    <Head>
      <meta
        property="twitter:card"
        content="summary_large_image"
      />
      <meta
        property="twitter:url"
        content={config.base_url + url}
      />
      <meta
        property="twitter:title"
        content={title ? [title, config.site_title].join(' | ') : ''}
      />
      <meta
        property="twitter:description"
        content={description || config.site_description}
      />
    </Head>
  )
}

TwitterCardMeta.defaultProps = {
  description: 'Insincere Engineer',
  title: 'Insincere Engineer',
}
