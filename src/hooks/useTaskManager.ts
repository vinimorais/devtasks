'use client'

import { useEffect, useReducer, useCallback } from 'react'
import { Task } from '@/domain/entities/Task'
import { StorageService } from '@/services/TaskStorageService'

// Definindo as actions com Discriminated Unions
type TaskAction =
  | { type: 'ADD'; payload: Omit<Task, 'id' | 'createdAt'> }
  | { type: 'UPDATE'; payload: { id: string; data: Partial<Omit<Task, 'id' | 'createdAt'>> } }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'LOAD'; payload: Task[] }

// Reducer
function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          ...action.payload,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
      ]

    case 'UPDATE':
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.data }
          : task
      )

    case 'DELETE':
      return state.filter(task => task.id !== action.payload.id)

    case 'LOAD':
      return action.payload

    default:
      return state
  }
}

// Hook
export function useTaskManager() {
  const storage = new StorageService<Task[]>('devtasks')
  const [tasks, dispatch] = useReducer(taskReducer, [])

  // Carregar do localStorage
  useEffect(() => {
    const stored = storage.load()
    if (stored) dispatch({ type: 'LOAD', payload: stored })
  }, [])

  // Salvar no localStorage sempre que tasks mudarem
  useEffect(() => {
    storage.save(tasks)
  }, [tasks])

  // Funções expostas
  const addTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt'>) =>
      dispatch({ type: 'ADD', payload: taskData }),
    []
  )

  const updateTask = useCallback(
    (id: string, data: Partial<Omit<Task, 'id' | 'createdAt'>>) =>
      dispatch({ type: 'UPDATE', payload: { id, data } }),
    []
  )

  // Nova função para alterar apenas o status
  const updateTaskStatus = useCallback(
    (id: string, status: Task['status']) => {
      dispatch({ type: 'UPDATE', payload: { id, data: { status } } })
    },
    []
  )

  const deleteTask = useCallback(
    (id: string) => dispatch({ type: 'DELETE', payload: { id } }),
    []
  )

  return { tasks, addTask, updateTask, updateTaskStatus, deleteTask }
}