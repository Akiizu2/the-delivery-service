import { COST_CODE, Route } from '../../helpers/town'
import RouteSelector from '../route-selecter'
import styles from './routeCostCalculater.module.scss'
import useRouteCostCalculater from './routeCostCalculater.hook'

type RouteCostCalculaterProps = {
  providedTown: Route[]
}

const RouteCostCalculater: React.FC<RouteCostCalculaterProps> = ({
  providedTown,
}) => {
  const { cost } = useRouteCostCalculater(providedTown)

  return (
    <div className={styles.container}>
      <h3>Cost calculater</h3>
      <div className={styles.routeSelectorWrapper}>
        <RouteSelector providedTown={providedTown} />
      </div>
      {cost === COST_CODE.NO_SUCH_ROUTE && (
        <div className={styles.costWrapper}>No Such Route</div>
      )}
      {cost === COST_CODE.HAVE_NONE_SELECT_TOWN && (
        <small className={styles.helperText}>Please select town.</small>
      )}
      {cost > 0 && <div className={styles.costWrapper}>Cost: {cost}</div>}
    </div>
  )
}

export default RouteCostCalculater
