'use client'

import { createContext, ReactNode, useContext } from 'react'
import { Task } from '@/domain/entities/Task'
import { useTaskManager } from '@/hooks/useTaskManager'

// Tipagem do contexto
interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, data: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
  deleteTask: (id: string) => void
}

// Criando o contexto
const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Provider
interface TaskProviderProps {
  children: ReactNode
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const { tasks, addTask, updateTask, updateTaskStatus, deleteTask } = useTaskManager()

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, updateTaskStatus, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}

// Hook para usar o contexto facilmente
export const useTasksContext = (): TaskContextType => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasksContext must be used within a TaskProvider')
  }
  return context
}