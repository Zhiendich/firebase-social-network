import React from 'react'
import Style from './input.module.css'
interface inputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Input: React.FC<inputProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <input onChange={onChange} value={value} className={Style.input} type={type} placeholder={placeholder} />
  )
}

export default Input