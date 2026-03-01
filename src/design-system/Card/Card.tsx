'use client'

import { FC, ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

export const Card: FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        `
        bg-white
        border border-gray-200
        rounded-lg
        p-4
        shadow-sm
        transition-all duration-200
        `,
        hoverable &&
          `
          hover:shadow-md
          hover:-translate-y-0.5
          cursor-pointer
          `,
        className
      )}
    >
      {children}
    </div>
  )
}