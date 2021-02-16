import { Fragment, useMemo } from 'react'
import Arrow from '../../components/arrow'
import Button from '../../components/button'
import Select from '../../components/select'
import { NONE_SELECT_VALUE } from '../../stores/user/intialState'
import styles from './routeSelecter.module.scss'
import { townListOptions } from '../../data/town'
import useRouteCostCalculater from '../route-cost-calculater/routeCostCalculater.hook'
import type { Route } from '../../helpers/town'
import { COST_CODE } from '../../helpers/town'

type RouteSelecterProps = {
  providedTown: Route[]
}

const RouteSelecter: React.FC<RouteSelecterProps> = ({ providedTown }) => {
  const {
    selectedTown,
    handleRemoveLastTown,
    handleAddTown,
    handleSelectTown,
    cost,
  } = useRouteCostCalculater(providedTown)

  const isSelectedLastTown = useMemo(
    () => selectedTown[selectedTown.length - 1] !== NONE_SELECT_VALUE,
    [selectedTown]
  )

  const isNoSuchRoute = useMemo(() => cost === COST_CODE.NO_SUCH_ROUTE, [cost])

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <Button
          disabled={!isSelectedLastTown || isNoSuchRoute}
          onClick={handleAddTown}
        >
          Add Town
        </Button>
        <Button
          disabled={selectedTown.length < 3}
          onClick={handleRemoveLastTown}
        >
          Remove Last Town
        </Button>
      </div>
      <div className={styles.selectorWrapper}>
        {selectedTown.map((town, index) => (
          <Fragment key={`${town}-${index}`}>
            {index > 0 && <Arrow />}
            <Select
              onChange={handleSelectTown(index)}
              items={townListOptions}
              value={town}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default RouteSelecter
