import { InputHTMLAttributes } from 'react'
import classnames from 'classnames'
import styles from './input.module.scss'

type InputProps = {
  className?: string
} & Partial<InputHTMLAttributes<HTMLInputElement>>

const Input: React.FC<InputProps> = ({ className = '', ...inputAttr }) => {
  return (
    <input
      className={classnames(styles.input, {
        [`${className}`]: !!className,
      })}
      {...inputAttr}
    />
  )
}

export default Input
