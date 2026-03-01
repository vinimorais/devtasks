'use client'

import { FC } from 'react'

interface BadgeProps {
  text: string
  color?: 'green' | 'red' | 'yellow'
}

export const Badge: FC<BadgeProps> = ({ text, color = 'green' }) => {
  const colorClass = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  }[color]

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${colorClass}`}
    >
      {text}
    </span>
  )
}