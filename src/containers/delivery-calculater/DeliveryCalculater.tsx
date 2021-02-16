import { useState } from 'react'
import { getRouteList, Route } from '../../helpers/town'
import RouteCostCalculater from '../route-cost-calculater'
import data from '../../source/town.json'
import PossibilityRouteCalculater from '../possiblity-route-calculater/PossiblityRouteCalculater'
import styles from './deliveryCalculater.module.scss'
import ProvidedRoutes from '../providedRoutes'

type DeliveryCalculaterProps = {}

const DeliveryCalculater: React.FC<DeliveryCalculaterProps> = () => {
  const [providedTown] = useState<Route[]>(getRouteList(data.list))

  return (
    <div className={styles.deliveryCalculater}>
      <div className={styles.sectionWrapper}>
        <ProvidedRoutes providedTown={providedTown} />
      </div>
      <div className={styles.sectionWrapper}>
        <RouteCostCalculater providedTown={providedTown} />
      </div>
      <div className={styles.sectionWrapper}>
        <PossibilityRouteCalculater providedTown={providedTown} />
      </div>
    </div>
  )
}

export default DeliveryCalculater
