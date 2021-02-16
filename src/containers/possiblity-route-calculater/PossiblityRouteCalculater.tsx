import { useCallback, useState } from 'react'
import Arrow from '../../components/arrow'
import CheckBox from '../../components/checkbox'
import Input from '../../components/input'
import Select from '../../components/select'
import { townListOptions } from '../../data/town'
import type { Route } from '../../helpers/town'
import usePossibilityCalculater from './possibilityRouteCalculater.hook'
import styles from './possibilityRouteCalculater.module.scss'

type PossibilityRouteCalculaterProps = {
  providedTown: Route[]
}

const PossibilityRouteCalculater: React.FC<PossibilityRouteCalculaterProps> = ({
  providedTown,
}) => {
  const [isEnableMaxStop, setIsEnableMaxStop] = useState(false)
  const [maxStop, setMaxStop] = useState<number | undefined>()

  const {
    handleFromChange,
    handleToChange,
    to,
    from,
    possibleRoute,
    mathRoutes,
  } = usePossibilityCalculater(providedTown, maxStop)

  const handleToggleMaxStop = useCallback((e) => {
    setIsEnableMaxStop(e.target.checked)
    if (!e.target.checked) {
      setMaxStop(undefined)
    }
  }, [])

  const handleMaxStopChange = useCallback((e) => {
    setMaxStop(+e.target.value)
  }, [])

  return (
    <div className={styles.container}>
      <h3>Possibility of routes</h3>
      <div className={styles.pathSelector}>
        <Select
          onChange={handleFromChange}
          items={townListOptions}
          value={from}
        />
        <Arrow />
        <Select onChange={handleToChange} items={townListOptions} value={to} />
      </div>
      <div className={styles.optionsWrapper}>
        <h4 className={styles.optionHeader}>Options </h4>
        <div className={styles.optionItemWrapper}>
          <CheckBox checked={isEnableMaxStop} onChange={handleToggleMaxStop} />
          <span className={styles.optionLabel}>Limit stop:</span>
          <Input
            className={styles.optionInput}
            value={maxStop || ''}
            onChange={handleMaxStopChange}
            disabled={!isEnableMaxStop}
            type="number"
          />
        </div>
      </div>
      <div className={styles.resultWrapper}>
        {possibleRoute > 0 && (
          <div className={styles.possibilityCount}>
            Possibility: {possibleRoute}
          </div>
        )}
        <ul className={styles.matchPathWrapper}>
          {mathRoutes?.map((route) => (
            <li className={styles.matchPathItem}>{route.join(' ➜ ')}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PossibilityRouteCalculater
