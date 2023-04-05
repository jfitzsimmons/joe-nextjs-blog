import Head from 'next/head'
import Navigation from './Navigation'
import dynamic from 'next/dynamic'
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#000" />
      </Head>
      <DynamicComponentWithNoSSR />
      <nav className={styles.nav}>
        <Navigation />
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
