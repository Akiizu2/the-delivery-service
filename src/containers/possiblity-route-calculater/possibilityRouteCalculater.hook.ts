import { useCallback, useMemo, useState } from 'react'
import { findPossibleRoute, Route } from '../../helpers/town'
import { NONE_SELECT_VALUE } from '../../stores/user/intialState'

function usePossibilityCalculater(providedTown: Route[], maxStop?: number) {
  const [from, setFrom] = useState(NONE_SELECT_VALUE)
  const [to, setTo] = useState(NONE_SELECT_VALUE)

  const handleFromChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFrom(e.target.value)
    },
    []
  )

  const handleToChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTo(e.target.value)
    },
    []
  )

  const { count: possibleRoute, mathRoutes } = useMemo(
    () =>
      findPossibleRoute({
        providedRoutes: providedTown,
        route: {
          from,
          to,
        },
        maxStop,
      }),
    [from, to, providedTown, maxStop]
  )

  return {
    from,
    setFrom,
    to,
    setTo,
    handleFromChange,
    handleToChange,
    possibleRoute,
    mathRoutes,
  }
}

export default usePossibilityCalculater
