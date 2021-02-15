import { NONE_SELECT_VALUE } from '../stores/user/intialState'

export interface Route {
  from: string
  to: string
  cost: number
  visitedCount?: number
  adjacentTown?: Route[]
}

export enum COST_CODE {
  NO_SUCH_ROUTE = -1,
  HAVE_NONE_SELECT_TOWN = -2,
}

export type PossibleRouteArgs = {
  providedRoutes: Route[]
  route: Omit<Route, 'cost'>
  maxStop?: number
  isAllowTwiceRoute?: boolean
  maxCost?: number
}

export type PossibleRouteFunc = ({
  providedRoutes,
  route,
  maxStop,
}: PossibleRouteArgs) => number

const isSameRoute = (route: Route, targetRoute: Route): boolean =>
  route.from === targetRoute.from && route.to === targetRoute.to

const routeToRouteString = (route: Route): string => `${route.from}${route.to}`

export const getTownsFromList = (list: string[]): string[] =>
  list.reduce((list: string[], current: string): string[] => {
    const [first, second] = current.split('')
    let pushingItem = []
    if (!list.includes(first)) {
      pushingItem.push(first)
    }
    if (!list.includes(second)) {
      pushingItem.push(second)
    }
    return [...list, ...pushingItem]
  }, [])

export const getRouteList = (routeStrings: string[]): Route[] =>
  routeStrings.map(
    (route): Route => {
      const splitPattern = /([A-Z]{1})([A-Z]{1})([0-9]{1,2})/g
      const [from, to, cost] = route
        .replace(splitPattern, '$1|$2|$3')
        .split('|')
      return {
        from,
        to,
        cost: Number(cost),
      }
    }
  )

export const calculateCost = (
  providedRoutes: Route[],
  deliveryRoute: string[]
) => {
  if (deliveryRoute.some((route) => route === NONE_SELECT_VALUE)) {
    return COST_CODE.HAVE_NONE_SELECT_TOWN
  }

  const result = deliveryRoute.reduce((cost, town, index, allTown) => {
    const isLastTown = index === allTown.length - 1

    if (isLastTown) {
      return cost
    }
    const findCost = providedRoutes.find((route) => {
      const { from, to } = route
      const nextStop = allTown[index + 1]
      return from === town && nextStop === to
    })

    if (findCost) {
      return cost + findCost.cost
    }
    return COST_CODE.NO_SUCH_ROUTE
  }, 0)
  return result
}

export const getTownWithAdjacent = (providedRoutes: Route[]): Route[] =>
  providedRoutes.map((currentTown) => {
    const adjacentTown = providedRoutes.filter(
      (route) => route.from === currentTown.to
    )

    if (adjacentTown.length < 1) {
      return currentTown
    }

    return {
      ...currentTown,
      adjacentTown,
      visitedCount: 0,
    }
  })

const findPathCountUntilEnd = (
  currentPath: Route,
  to: string,
  pathCount: number,
  townWithAdjacent: Route[],
  usedRoute: string[] = [],
  maxStop = -1, // minus value mean don't have max stop
  isAllowTwiceRoute = false,
  maxCost = -1, // minus value mean don't have max cost
  currentCost = 0
): number => {
  // Recursive function to find the possible path from adjacent nodes
  function checkOnAdjacentTown() {
    currentPath.adjacentTown?.forEach((town) => {
      const mathRoute = townWithAdjacent.find((townWithAdj) =>
        isSameRoute(townWithAdj, town)
      )

      const updatedTown = townWithAdjacent.filter(
        (townAdj) =>
          !isAllowTwiceRoute || !usedRoute.includes(routeToRouteString(townAdj))
      )

      if (mathRoute) {
        pathCount = findPathCountUntilEnd(
          mathRoute,
          to,
          pathCount,
          updatedTown,
          usedRoute,
          maxStop,
          isAllowTwiceRoute,
          maxCost,
          currentCost
        )
      }
      if (!isAllowTwiceRoute) {
        town.visitedCount = 0
      }
    })
  }

  // Calculate current cost at current node.
  currentCost += currentPath.cost

  if (maxStop > 0 && usedRoute.length >= maxStop) {
    return pathCount
  }

  usedRoute = [...usedRoute, routeToRouteString(currentPath as Route)]

  if (!isAllowTwiceRoute) {
    if (!currentPath.visitedCount) {
      currentPath.visitedCount = 1
    } else {
      currentPath.visitedCount += 1
    }
  }

  const isCheckRequired =
    !isAllowTwiceRoute &&
    currentPath.visitedCount &&
    currentPath.visitedCount < 2

  // TODO: Incase of calculate with cost still not working correctly.
  // const isCalculateWithCost = maxCost > 0 && currentCost <= maxCost

  const isOnDestination = currentPath.to === to

  if (isOnDestination) {
    pathCount += 1
  } else if (isCheckRequired || isAllowTwiceRoute) {
    checkOnAdjacentTown()
  }

  return pathCount
}

export const findPossibleRoute: PossibleRouteFunc = ({
  providedRoutes,
  route,
  maxStop,
  isAllowTwiceRoute,
  maxCost,
}) => {
  const townWithAdjacent = getTownWithAdjacent(providedRoutes)

  const startPoints = townWithAdjacent.filter(
    (town) => town.from === route.from
  )
  let pathCount = 0
  let usedRoute: string[] = []

  startPoints.forEach((startPoint) => {
    usedRoute = []

    pathCount = findPathCountUntilEnd(
      startPoint,
      route.to,
      pathCount,
      townWithAdjacent,
      usedRoute,
      maxStop,
      isAllowTwiceRoute,
      maxCost
    )
    if (!isAllowTwiceRoute) {
      townWithAdjacent.forEach((town) => (town.visitedCount = 0))
    }
  })

  return pathCount
}
