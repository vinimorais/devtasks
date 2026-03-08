'use client'

import { ReactNode } from 'react'
import { TaskProvider } from '@/context/TaskContext'
import { AuthProvider } from '@/context/AuthContext'

interface AppWrapperProps {
  children: ReactNode
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <AuthProvider>
      <TaskProvider>{children}</TaskProvider>
    </AuthProvider>
  )
}