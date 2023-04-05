import {useRef, useEffect, useState} from "react";

type Props = {
  draw: (context,width,height) => void;
  height: number;
  width: number;
  fader?: number;
  animation?: boolean;
  instance?: string;
};

const useHasFocus = () => {
  // get the initial state
  const [focus, setFocus] = useState(true);

  useEffect(() => {
    // helper functions to update the status
    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);

    // assign the listener
    // update the status on the event
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    // remove the listener
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // return the status
  return focus;
};

export default function Canvas({draw, height, width, fader, animation, instance}: Props) {
  const canvas = useRef(null);
  const interval = useRef(null);
  const timeout = useRef(null);
  const hasFocus = useHasFocus()

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
    if (hasFocus === false) {
     clearTimeout(timeout.current);
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  },[hasFocus]);

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
          background-color: #0d0707;
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
          box-shadow: 0 0 25px 1px rgba(211, 184, 196, .3), inset 10px 10px 40px 0px rgba(11, 4, 6, 0.1);
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