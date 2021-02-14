import Arrow from '../../atoms/arrow'
import Button from '../../atoms/button'
import Select from '../../atoms/select'
import type { SelectOptions } from '../../atoms/select/Select'
import styles from './routeSelecter.module.scss'

type RouteSelectorProps = {}

// TODO: come from store
const mockOptions: SelectOptions[] = [
  {
    title: 'test2',
    value: 'val2',
  },
  {
    title: 'test1',
    value: 'val1',
  },
]

const RouteSelector: React.FC<RouteSelectorProps> = () => {
  return (
    <div className={styles.selectorWrapper}>
      <Select items={mockOptions} value="val1" />
      <Arrow />
      <Select items={mockOptions} value="val1" />
      <Arrow />
      <Select items={mockOptions} value="val1" />
      <Arrow disabled />
      <Button>Add Town</Button>
    </div>
  )
}

export default RouteSelector
