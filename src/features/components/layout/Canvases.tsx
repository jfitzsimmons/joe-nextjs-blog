import React from 'react'
import Canvas from '../../../common/components/Canvas'
import cosmosAnimation from '../../../utils/cosmos'

export default function Canvases() {
  const w = window.innerWidth
  const h = window.innerHeight
  return (
    <>
      <Canvas
        draw={cosmosAnimation}
        height={h}
        width={w}
        fader={24000}
        animation={false}
        instance="canvases"
      />
      <Canvas
        draw={cosmosAnimation}
        height={h}
        width={w}
        fader={16000}
        animation
        instance="canvases"
      />
    </>
  )
}
