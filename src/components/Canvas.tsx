import {useRef, useEffect} from "react";

type Props = {
  draw: (context,width,height) => void;
  height: number;
  width: number;
  fader?: number;
  animation?: boolean;
  instance?: string;
};

export default function Canvas({draw, height, width, fader, animation, instance}: Props) {
  const canvas = useRef(null);
  const interval = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {  
    let context = canvas.current.getContext('2d'); 
    draw(context,width,height);
    if (fader!==0) {
      timeout.current = setTimeout(function () {
        interval.current = setInterval(() => {
          draw(context,width,height);
        }, 20000);
      }, fader);
    }
  },[width]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <>
      <canvas
        className={(fader !==0) ? animation?"canvases":"canvases animation" : instance}
        ref={canvas}
        width={width}   
        height={height}
      />
      <style jsx>
      {`
        .canvases {
          position: fixed;
          z-index: 1;
          opacity: 1;
          height: 100vh; 
          width: 100vw;
          background-color: #fdf7f7;
        }
        .post {
          border-radius: 4vmin 4vmin 0px 0px;
          transform: scaleX(-1);
          width: 100%;
          height: 100%;
          backdrop-filter: saturate(280%);
        }
        .home {
          border-radius: 4vmin 4vmin 0px 0px;
          width: 100%;
          height: 100%;
          backdrop-filter: saturate(280%);
        }
        .logo {
          transform: scaleX(-1);
          border-radius: 75% 0 0 0;
          backdrop-filter: saturate(280%);
          box-shadow: 0 0 30px 10px rgba(211, 184, 196, .3), inset 10px 10px 40px 0px rgba(11, 4, 6, 0.1);
        }
        .animation {
            opacity: 1;
            animation: fade 20s ease-in-out infinite;   
        }
        @keyframes fade {
            45%,100% { opacity: 1 }
            50%,95% { opacity: 0 }
        }
      `}
    </style>
  </>
  )
}