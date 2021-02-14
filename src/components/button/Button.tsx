import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>

const Button: React.FC<ButtonProps> = ({ children, ...buttonAttr }) => {
  return <button {...buttonAttr}>{children}</button>
}

export default Button
