'use client'

import { ButtonHTMLAttributes, FC } from 'react'
import { ButtonProps } from './Button.types'

export const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyle = 'rounded font-semibold transition-colors duration-200'

  const variantStyle = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }[variant]

  const sizeStyle = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }[size]

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle}`} {...props}>
      {children}
    </button>
  )
}