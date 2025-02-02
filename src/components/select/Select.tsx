import type { SelectHTMLAttributes } from 'react'
import styles from './select.module.scss'

export type SelectOptions = {
  title: string
  value: string
  disabled?: boolean
}

export type SelectProps = {
  items: SelectOptions[]
} & Partial<SelectHTMLAttributes<HTMLSelectElement>>

const Select: React.FC<SelectProps> = ({ items, ...selectAttr }) => {
  return (
    <select className={styles.select} {...selectAttr}>
      {items.map((item) => (
        <option disabled={item.disabled} key={item.title} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  )
}

export default Select
