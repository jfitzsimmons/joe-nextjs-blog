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
    //NOT READY TO DELETE THESE CONSOLES        
    //console.log(`useEffect: ${width}`);
    //console.log(interval.current);
    let context = canvas.current.getContext('2d'); 
    draw(context,width,height);
    if (fader!==0) {
      timeout.current = setTimeout(function () {
        //console.log(`timeout fader: ${fader}`);
        interval.current = setInterval(() => {
          //console.log(`interval fader: ${fader}`);
          //console.log(`interval interval: ${interval.current}`);
          draw(context,width,height);
        }, 20000);
        //console.log(`timeout interval: ${interval.current}`);
      }, fader);
    }
  },[width]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, []);

  //console.log('canvas');
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
        }
        .home {
          border-radius: 4vmin 4vmin 0px 0px;
          opacity: .9;
          width: 100%;
          height: 200px;
        }
        .logo {
          transform: scaleX(-1);
          border-radius: 75% 0 0 0;
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


