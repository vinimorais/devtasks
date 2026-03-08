'use client'

import { FC, useState, useMemo } from 'react'
import { useTasksContext } from '@/context/TaskContext'
import { TaskCard } from './TaskCard'
import { Priority, Status } from '@/domain/enums/TaskEnums'
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  PRIORITY_ORDER,
} from '@/styles/task/TaskList.styles'

export const TaskList: FC = () => {
  const { tasks } = useTasksContext()

  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all')

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(
        task =>
          (filterPriority === 'all' || task.priority === filterPriority) &&
          (filterStatus === 'all' || task.status === filterStatus)
      )
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  }, [tasks, filterPriority, filterStatus])

  if (tasks.length === 0)
    return <p className="text-gray-500">Nenhuma task cadastrada</p>

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-700">Prioridade:</label>
          <select
            className="border rounded px-2 py-1 text-xs"
            value={filterPriority}
            onChange={e =>
              setFilterPriority(e.target.value as Priority | 'all')
            }
          >
            <option value="all">Todas</option>
            {PRIORITY_OPTIONS.map(p => (
              <option key={p} value={p}>
                {p.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <select
            className="border rounded px-2 py-1 text-xs"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as Status | 'all')}
          >
            <option value="all">Todos</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>
                {s.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-sm text-gray-500">Nenhuma task encontrada.</p>
        )}
      </div>
    </div>
  )
}