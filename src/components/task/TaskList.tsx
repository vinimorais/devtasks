'use client'

import { FC, useState, useMemo } from 'react'
import { useTasksContext } from '@/context/TaskContext'
import { TaskCard } from './TaskCard'
import { Priority, PRIORITY } from '@/domain/enums/TaskEnums'

export const TaskList: FC = () => {
  const { tasks } = useTasksContext()

  // 1️⃣ Estado de filtro de prioridade
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all')

  // 2️⃣ Definir ordem de prioridade (maior prioridade primeiro)
  const priorityOrder: Record<Priority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  }

  // 3️⃣ Lista derivada: filtrada + ordenada
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => filterPriority === 'all' || task.priority === filterPriority)
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }, [tasks, filterPriority])

  // 4️⃣ Renderização
  if (tasks.length === 0)
    return <p className="text-gray-500">Nenhuma task cadastrada</p>

  return (
    <div className="flex flex-col gap-3">
      {/* Filtros */}
      <div className="flex gap-2 items-center mb-2">
        <label className="text-sm font-medium text-gray-700">Filtrar por prioridade:</label>
        <select
          className="border rounded px-2 py-1 text-xs"
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value as Priority | 'all')}
        >
          <option value="all">Todas</option>
          {Object.values(PRIORITY).map(p => (
            <option key={p} value={p}>{p.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Lista de Tasks */}
      <div className="grid gap-3">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}