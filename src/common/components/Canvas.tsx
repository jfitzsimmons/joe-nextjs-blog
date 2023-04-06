import React, { useRef, useEffect, useState } from 'react'
import styles from './Canvas.module.css'

type Props = {
  draw: (context, width, height) => void
  height: number
  width: number
  fader: number | 0
  animation: boolean | true
  instance: string
}

const useHasFocus = () => {
  // get the initial state
  const [focus, setFocus] = useState(true)

  useEffect(() => {
    // helper functions to update the status
    const onFocus = () => setFocus(true)
    const onBlur = () => setFocus(false)

    // assign the listener
    // update the status on the event
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    // remove the listener
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  // return the status
  return focus
}

export default function Canvas({
  draw,
  height,
  width,
  fader,
  animation = true,
  instance,
}: Props) {
  const canvas = useRef(null)
  const interval = useRef(null)
  const timeout = useRef(null)
  const hasFocus = useHasFocus()

  const getCanvasClasses = () => {
    console.log('animation', animation)
    const classString = fader !== 0 ? styles.canvases : styles[instance]
    const animString = animation ? styles.animation : ' '
    console.log('animString', animString)
    const testjpf = classString.concat(' ', animString)
    console.log('testjpf', testjpf)
    return testjpf
  }

  useEffect(() => {
    const context = canvas.current.getContext('2d')
    draw(context, width, height)
    if (fader !== 0) {
      timeout.current = setTimeout(() => {
        interval.current = setInterval(() => {
          draw(context, width, height)
        }, 20000)
      }, fader)
    }
  }, [draw, fader, height, width])

  useEffect(() => {
    if (hasFocus === false) {
      clearTimeout(timeout.current)
      clearInterval(interval.current)
    }
    return () => {
      clearInterval(interval.current)
      clearTimeout(timeout.current)
    }
  }, [hasFocus])

  return (
    <canvas
      className={getCanvasClasses()}
      ref={canvas}
      width={width}
      height={height}
    />
  )
}
