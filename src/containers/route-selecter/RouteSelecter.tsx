import { useCallback, useMemo } from 'react'
import Arrow from '../../components/arrow'
import Button from '../../components/button'
import Select from '../../components/select'
import type { SelectOptions } from '../../components/select/Select'
import type { RootState } from '../../stores/reducer'
import { NONE_SELECT_VALUE } from '../../stores/user/intialState'
import styles from './routeSelecter.module.scss'
import data from '../../data/town.json'
import { getTownsFromList } from '../../helpers/town'
import { useDispatch, useSelector } from 'react-redux'
import { addTown, selectTown, removeLastTown } from '../../stores/user/action'

const townListOptions: SelectOptions[] = [
  { title: '---', value: NONE_SELECT_VALUE, disabled: true },
  ...getTownsFromList(data.list).map((town) => ({
    title: town,
    value: town,
  })),
]

type RouteSelecterProps = {}

const RouteSelecter: React.FC<RouteSelecterProps> = () => {
  const selectedTown = useSelector<RootState, string[]>(
    (state) => state.userReducers.selectedTown
  )

  const dispatch = useDispatch()

  const handleAddTown = useCallback(() => {
    dispatch(addTown())
  }, [dispatch])

  const handleRemoveLastTown = useCallback(() => {
    dispatch(removeLastTown())
  }, [dispatch])

  const handleSelectTown = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(selectTown(index, e.target.value))
    },
    [dispatch]
  )

  const isSelectedLastTown = useMemo(
    () => selectedTown[selectedTown.length - 1] !== NONE_SELECT_VALUE,
    [selectedTown]
  )

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <Button disabled={!isSelectedLastTown} onClick={handleAddTown}>
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
          <>
            {index > 0 && <Arrow />}
            <Select
              onChange={handleSelectTown(index)}
              items={townListOptions}
              value={town}
            />
          </>
        ))}
      </div>
    </div>
  )
}

export default RouteSelecter
