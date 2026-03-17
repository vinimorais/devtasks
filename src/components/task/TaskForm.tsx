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
  const [priority, setPriority] = useState<Priority>('baixa')
  const [status, setStatus] = useState<Status>('pendente')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title) return
    addTask({ title, description, priority, status })
    setTitle('')
    setDescription('')
    setPriority('baixa')
    setStatus('pendente')
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
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>

        <select
          value={status}
          onChange={e => setStatus(e.target.value as Status)}
          className="border rounded px-2 py-1"
        >
          <option value="pendete">Pendente</option>
          <option value="em progresso">Em progresso</option>
          <option value="concluido">Concluída</option>
        </select>
      </div>
      <Button type="submit" variant="primary">Adicionar Task</Button>
    </form>
  )
}