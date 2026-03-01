'use client'

import { FC, InputHTMLAttributes } from 'react'
import { InputProps } from './Input.types'

export const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...props}
      />
    </div>
  )
}