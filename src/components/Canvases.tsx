import Canvas from "./Canvas";
import { cosmos } from "../utils/cosmos";

export default function Canvases() {
    let w = window.innerWidth;
    let h = window.innerHeight;
  return (
    <>
      <Canvas draw={cosmos} height={h} width={w} fader={24000} animation={true} instance={"canvases"}/>
      <Canvas draw={cosmos} height={h} width={w} fader={16000} animation={false} instance={"canvases"}/>
    </>
  );
}