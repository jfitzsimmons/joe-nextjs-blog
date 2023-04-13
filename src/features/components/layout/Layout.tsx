import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navigation from './Navigation'
import styles from './Layout.module.css'

const DynamicComponentWithNoSSR = dynamic(() => import('./Canvases'), {
  ssr: false,
})

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
        />
        <meta
          name="theme-color"
          content="#100"
        />
      </Head>
      <DynamicComponentWithNoSSR />
      <Navigation />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
