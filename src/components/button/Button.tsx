import { ButtonHTMLAttributes } from 'react'
import styles from './button.module.scss'

type ButtonProps = {} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>

const Button: React.FC<ButtonProps> = ({ children, ...buttonAttr }) => {
  return (
    <button className={styles.button} {...buttonAttr}>
      {children}
    </button>
  )
}

export default Button
