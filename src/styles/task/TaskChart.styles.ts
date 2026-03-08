import { Priority, Status } from '@/domain/enums/TaskEnums'

export const priorityLabels: Priority[] = ['low', 'medium', 'high']
export const statusLabels: Status[] = ['pending', 'in_progress', 'done']

export const priorityLabel = (priority: Priority) => {
  switch (priority) {
    case 'low':
      return 'Baixa'
    case 'medium':
      return 'Média'
    case 'high':
      return 'Alta'
  }
}

export const statusLabel = (status: Status) => {
  switch (status) {
    case 'pending':
      return 'Pendente'
    case 'in_progress':
      return 'Em Progresso'
    case 'done':
      return 'Concluído'
  }
}

export const statusColor = (status: Status) => {
  switch (status) {
    case 'pending':
      return 'rgba(34,197,94,0.7)' 
    case 'in_progress':
      return 'rgba(250,204,21,0.7)' 
    case 'done':
      return 'rgba(68, 205, 239, 0.7)' 
  }
}

export const filterOptions: ('all' | Status)[] = ['all', 'pending', 'in_progress', 'done']