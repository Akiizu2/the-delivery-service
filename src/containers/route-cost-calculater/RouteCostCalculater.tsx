import RouteSelector from '../route-selecter'
import styles from './routeCostCalculater.module.scss'

type RouteCostCalculaterProps = {}

const RouteCostCalculater: React.FC<RouteCostCalculaterProps> = () => {
  return (
    <div className={styles.container}>
      <RouteSelector />
      <div className={styles.costWrapper}>Cost: xx</div>
    </div>
  )
}

export default RouteCostCalculater
