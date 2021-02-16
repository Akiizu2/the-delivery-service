import { InputHTMLAttributes } from 'react'

import styles from './checkbox.module.scss'

type CheckBoxProps = {} & Partial<InputHTMLAttributes<HTMLInputElement>>

const CheckBox: React.FC<CheckBoxProps> = ({ ...checkboxAttr }) => {
  return <input className={styles.checkbox} type="checkbox" {...checkboxAttr} />
}

export default CheckBox
