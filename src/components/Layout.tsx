import Head from "next/head";
import Navigation from "./Navigation";

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
        <meta name="theme-color" content="#fff" />
        <script type="text/javascript" src="scripts/cosmos.js"></script>
      </Head>
      <div className="canvases">
          <canvas id="canvas2">
              Sorry, your browser does not support canvas.
          </canvas>
      </div>

      <div className="canvases" id="fader">
          <canvas id="canvas1">
              Sorry, your browser does not support canvas.
          </canvas>
      </div>
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
          }
          main {
            z-index: 2;
            display: flex;
            min-height: 100%;
          }
          .canvases {
            position: fixed;
            z-index: 1;
            opacity: 1;
            background: transparent;
            height: 100vh; 
            width: 100vw;
          }
      
          .animation {
              opacity: 1;
              animation: fade 50s ease-in-out infinite;   
          }
      
          @keyframes fade {
              45%,100% { opacity: 1 }
              50%,95% { opacity: 0 }
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
