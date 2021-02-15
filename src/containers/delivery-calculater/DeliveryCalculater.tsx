import { useState } from 'react'
import { findPossibleRoute, getRouteList, Route } from '../../helpers/town'
import RouteCostCalculater from '../route-cost-calculater'
import data from '../../data/town.json'

console.log(
  'E -> D',
  findPossibleRoute({
    providedRoutes: getRouteList(data.list),
    route: { from: 'E', to: 'D' },
    maxStop: 4,
  })
)

console.log(
  'E -> E',
  findPossibleRoute({
    providedRoutes: getRouteList(data.list),
    route: { from: 'E', to: 'E' },
  })
)

console.log(
  'E -> E ( Bonus )',
  findPossibleRoute({
    providedRoutes: getRouteList(data.list),
    route: { from: 'E', to: 'E' },
    isAllowTwiceRoute: true,
  })
)

type DeliveryCalculaterProps = {}

const DeliveryCalculater: React.FC<DeliveryCalculaterProps> = () => {
  const [providedTown] = useState<Route[]>(getRouteList(data.list))

  return (
    <div>
      <RouteCostCalculater providedTown={providedTown} />
    </div>
  )
}

export default DeliveryCalculater
