import React from 'react'
import CodePen from '../../assets/codepen-alt.svg'
import GitHub from '../../assets/github-alt.svg'
import config from '../utils/config'
import styles from './SocialList.module.css'

export default function SocialList() {
  return (
    <div>
      <a
        className={styles.social_icon_link}
        title="GitHub"
        href={`https://github.com/${config.github_account}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub
          width={24}
          height={24}
        />
      </a>
      <a
        className={styles.social_icon_link}
        title="CodePen"
        href={`https://codepen.com/${config.codepen_account}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CodePen
          width={24}
          height={24}
          fill="none"
        />
      </a>
    </div>
  )
}
