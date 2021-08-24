import {useRef, useEffect} from "react";

type Props = {
  draw: (context) => void;
  height: number;
  width: number;
  fader: number;
  animation: boolean;
};

export default function Canvas({draw, height, width, fader, animation}: Props) {
  const canvas = useRef(null);
  const interval = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {  
    //NOT READY TO DELETE THESE CONSOLES        
    //console.log('useEffect');
    //console.log(interval.current);
    let context = canvas.current.getContext('2d'); 
    draw(context);
    timeout.current = setTimeout(function () {
      //console.log(`timeout fader: ${fader}`);
      interval.current = setInterval(() => {
        //console.log(`interval fader: ${fader}`);
        //console.log(`interval interval: ${interval.current}`);
        draw(context);
      }, 20000);
      //console.log(`timeout interval: ${interval.current}`);
    }, fader);
  },[]);

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
        className={animation?"canvases":"canvases animation"}
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
          background: #fff;
          height: 100vh; 
          width: 100vw;
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


