import Head from "next/head";
import Navigation from "./Navigation";
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('./Canvases'),
  { ssr: false }
)

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#000" />
      </Head>
      <DynamicComponentWithNoSSR/>
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
      <style jsx>
        {`
          .root {
            display: block;
            box-sizing: border-box;
            height: 100%;
            height: fit-content;
          }
          main {
            position: relative;
            z-index: 2;
            display: flex;
            min-height: 100%;
            flex-wrap: wrap;
            padding: 0 4vmin;
          }
          nav {
            position: relative;
            z-index: 3;
            display: flex;
            flex-direction: column;
          }
          @media (min-width: 769px) {
            .root {
              display: flex;
              flex: 1 1 auto;
            }
            main {
              flex: 1 1 auto;
            }
          }
        `}
      </style>
    </div>
  );
}
