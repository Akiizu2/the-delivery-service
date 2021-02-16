import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateDeliveryCost } from '../../stores/calculater/action'
import type { Route } from '../../helpers/town'
import type { RootState } from '../../stores/reducer'
import { addTown, removeLastTown, selectTown } from '../../stores/user/action'

function useRouteCostCalculater(providedTown: Route[]) {
  const dispatch = useDispatch()
  const cost = useSelector<RootState, number>(
    (state) => state.calculaterReducers.cost
  )
  const selectedTown = useSelector<RootState, string[]>(
    (state) => state.userReducers.selectedTown
  )

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

  useEffect(() => {
    dispatch(calculateDeliveryCost(providedTown, selectedTown))
  }, [dispatch, selectedTown, providedTown])

  return {
    cost,
    handleAddTown,
    handleRemoveLastTown,
    handleSelectTown,
    selectedTown,
  }
}

export default useRouteCostCalculater
