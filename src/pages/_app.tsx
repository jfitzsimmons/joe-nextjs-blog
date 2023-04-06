import React from 'react'
import 'normalize.css'
import { AppProps } from 'next/app'
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import '../../public/styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  // testjpf: fix?!
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />
}
