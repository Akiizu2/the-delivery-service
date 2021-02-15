import { COST_CODE, Route } from '../../helpers/town'
import RouteSelector from '../route-selecter'
import styles from './routeCostCalculater.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../stores/reducer'
import { useEffect } from 'react'
import { calculateDeliveryCost } from '../../stores/calculater/action'

type RouteCostCalculaterProps = {
  providedTown: Route[]
}

const RouteCostCalculater: React.FC<RouteCostCalculaterProps> = ({
  providedTown,
}) => {
  const dispatch = useDispatch()
  const cost = useSelector<RootState, number>(
    (state) => state.calculaterReducers.cost
  )
  const selectedTown = useSelector<RootState, string[]>(
    (state) => state.userReducers.selectedTown
  )

  useEffect(() => {
    dispatch(calculateDeliveryCost(providedTown, selectedTown))
  }, [dispatch, selectedTown, providedTown])

  return (
    <div className={styles.container}>
      <RouteSelector />
      {cost === COST_CODE.NO_SUCH_ROUTE && (
        <div className={styles.costWrapper}>No Such Route</div>
      )}
      {cost === COST_CODE.HAVE_NONE_SELECT_TOWN && (
        <div className={styles.costWrapper}>Please select town.</div>
      )}
      {cost > 0 && <div className={styles.costWrapper}>Cost: {cost}</div>}
    </div>
  )
}

export default RouteCostCalculater
