'use client'

import { FC, useState } from 'react'
import { Task } from '@/domain/entities/Task'
import { Card } from '@/design-system/Card/Card'
import { Badge } from '@/design-system/Badge/Badge'
import { Button } from '@/design-system/Button/Button'
import { Input } from '@/design-system/Input/Input'
import { Textarea } from '@/design-system/Textarea/Textarea'
import { useTasksContext } from '@/context/TaskContext'
import { PRIORITY, STATUS, Priority } from '@/domain/enums/TaskEnums'

interface TaskCardProps {
  task: Task
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { deleteTask, updateTask } = useTasksContext()
  const [isEditing, setIsEditing] = useState(false)

  // Estados locais de edição
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedPriority, setEditedPriority] = useState<Priority>(task.priority)
  const [editedStatus, setEditedStatus] = useState<Task['status']>(task.status)

  const priorityColorMap: Record<Priority, 'green' | 'yellow' | 'red'> = {
    low: 'green',
    medium: 'yellow',
    high: 'red',
  }

  const priorityColor = priorityColorMap[editedPriority]

  const handleSave = () => {
    updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      status: editedStatus,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(task.title)
    setEditedDescription(task.description)
    setEditedPriority(task.priority)
    setEditedStatus(task.status)
    setIsEditing(false)
  }

  return (
    <Card
      hoverable
      className={`flex flex-col gap-3 border-l-4 ${
        task.priority === 'high' ? 'border-red-500' :
        task.priority === 'medium' ? 'border-yellow-400' :
        'border-green-400'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug">
          {task.title}
        </h3>
        <Badge
          text={task.priority.toUpperCase()}
          color={
            task.priority === 'high' ? 'red' :
            task.priority === 'medium' ? 'yellow' :
            'green'
          }
        />
      </div>

      {/* Description */}
      {isEditing ? (
        <Textarea
          label="Descrição"
          value={editedDescription}
          onChange={e => setEditedDescription(e.target.value)}
          rows={3}
        />
      ) : (
        <p className="text-sm text-gray-600 line-clamp-3">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
            {/* Status */}
            <select
              className="border rounded px-2 py-1 text-xs"
              value={editedStatus}
              onChange={e => setEditedStatus(e.target.value as Task['status'])}
            >
              {Object.values(STATUS).map(s => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>

            {/* Priority */}
            <select
              className="border rounded px-2 py-1 text-xs"
              value={editedPriority}
              onChange={e => setEditedPriority(e.target.value as Priority)}
            >
              {Object.values(PRIORITY).map(p => (
                <option key={p} value={p}>
                  {p.toUpperCase()}
                </option>
              ))}
            </select>

            <div className="ml-auto flex gap-2">
              <Button variant="primary" onClick={handleSave}>
                Salvar
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {task.status}
            </span>

            <div className="flex gap-2">
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>
                Excluir
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}