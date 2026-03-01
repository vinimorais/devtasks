'use client'

import { ReactNode } from 'react'
import { TaskProvider } from '@/context/TaskContext'

interface AppWrapperProps {
  children: ReactNode
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return <TaskProvider>{children}</TaskProvider>
}