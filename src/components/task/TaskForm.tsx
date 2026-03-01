'use client'

import { FC, useState, FormEvent } from 'react'
import { Input } from '@/design-system/Input/Input'
import { Button } from '@/design-system/Button/Button'
import { Priority, Status } from '@/domain/enums/TaskEnums'
import { useTasksContext } from '@/context/TaskContext'

export const TaskForm: FC = () => {
  const { addTask } = useTasksContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('low')
  const [status, setStatus] = useState<Status>('pending')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title) return
    addTask({ title, description, priority, status })
    setTitle('')
    setDescription('')
    setPriority('low')
    setStatus('pending')
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input label="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <Input
        label="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          className="border rounded px-2 py-1"
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>

        <select
          value={status}
          onChange={e => setStatus(e.target.value as Status)}
          className="border rounded px-2 py-1"
        >
          <option value="pending">Pendente</option>
          <option value="in_progress">Em progresso</option>
          <option value="done">Concluída</option>
        </select>
      </div>
      <Button type="submit" variant="primary">Adicionar Task</Button>
    </form>
  )
}