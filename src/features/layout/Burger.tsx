import styles from './Burger.module.css'

type Props = {
  active: boolean
  onClick: () => void
}
export default function Burger({ active, onClick }: Props) {
  return (
    <div className={styles.container + (active ? ' ' + styles.active : '')} onClick={onClick}>
      <div className={`${styles.meat} ${styles.meat_1}`} />
      <div className={`${styles.meat} ${styles.meat_2}`} />
      <div className={`${styles.meat} ${styles.meat_3}`} />
    </div>
  )
}
