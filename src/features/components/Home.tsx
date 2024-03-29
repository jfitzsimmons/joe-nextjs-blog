import React, { useRef, useEffect, useState } from 'react'
import Canvas from '../../common/components/Canvas'
// import SocialList from '../../common/components/SocialList'
import mountainsAnimation from '../../utils/mountains'
import styles from './Home.module.css'

export default function Home() {
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 })
  const div = useRef(null)

  useEffect(() => {
    if (div.current)
      setDimensions({
        w: div.current.offsetWidth,
        h: Math.round(window.innerHeight * 0.33),
      })
  }, [])

  return (
    <div className={`${styles.container}`}>
      <div className={styles.flex_column}>
        <div
          className={styles.mountains}
          ref={div}
        >
          <h1 className={styles.title}>
            Insincere <span className={styles.fancy}>Engineer</span>
          </h1>
          <Canvas
            draw={mountainsAnimation}
            height={dimensions.h}
            width={dimensions.w}
            fader={0}
            animation={false}
            instance="home"
          />
        </div>
        <div className={`card ${styles.bottom}`}>
          <h2 className={styles.tagline}>
            A website so novel, it&apos;s arguably a complete waste of time!
          </h2>
          {/** <SocialList /> */}
        </div>
      </div>
    </div>
  )
}
