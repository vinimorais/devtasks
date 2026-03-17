import { Priority, Status } from '@/domain/enums/TaskEnums'

export const priorityLabels: Priority[] = ['baixa', 'media', 'alta']
export const statusLabels: Status[] = ['pendente', 'em progresso', 'concluido']

export const priorityLabel = (priority: Priority) => {
  switch (priority) {
    case 'baixa':
      return 'Baixa'
    case 'media':
      return 'Média'
    case 'alta':
      return 'Alta'
  }
}

export const statusLabel = (status: Status) => {
  switch (status) {
    case 'pendente':
      return 'Pendente'
    case 'em progresso':
      return 'Em Progresso'
    case 'concluido':
      return 'Concluído'
  }
}

export const statusColor = (status: Status) => {
  switch (status) {
    case 'pendente':
      return 'rgba(34,197,94,0.7)' 
    case 'em progresso':
      return 'rgba(250,204,21,0.7)' 
    case 'concluido':
      return 'rgba(68, 205, 239, 0.7)' 
  }
}

export const filterOptions: ('all' | Status)[] = ['all', 'pendente', 'em progresso', 'concluido']