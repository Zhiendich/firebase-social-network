import React from 'react'
import Style from './button.module.css'
interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={Style.button}>
      {children}
    </button>
  )
}

export default Button
