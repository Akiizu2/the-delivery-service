import ArrowWithCost from '../../components/arrowWithCost'
import DirectedGraph from '../../components/directedGraph'
import { Route } from '../../helpers/town'
import styles from './providedRoutes.module.scss'

type ProvidedRoutesProps = {
  providedTown: Route[]
}
const ProvidedRoutes: React.FC<ProvidedRoutesProps> = ({ providedTown }) => {
  return (
    <div className={styles.container}>
      <h3>Available routes</h3>
      <div className={styles.routeContainer}>
        <DirectedGraph width={600} height={300} routes={providedTown} />
        <div className={styles.routeCostTable}>
          {providedTown.map((town) => (
            <div className={styles.routesWrapper}>
              {town.from}
              <span className={styles.arrowWrapper}>
                <ArrowWithCost cost={town.cost} />
              </span>
              {town.to}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProvidedRoutes
