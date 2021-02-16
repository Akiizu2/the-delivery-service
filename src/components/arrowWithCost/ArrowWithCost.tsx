import styles from './arrowWithCost.module.scss'

type ArrowWithCostProps = {
  cost: number
}
const ArrowWithCost: React.FC<ArrowWithCostProps> = ({ cost }) => {
  return (
    <div className={styles.arrowWithCost} style={{ height: cost / 2 }}>
      <div className={styles.arrowCost}>{cost}</div>
    </div>
  )
}

export default ArrowWithCost
