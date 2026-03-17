import { PRIORITY, STATUS, Priority, Status } from '@/domain/enums/TaskEnums'

export const PRIORITY_OPTIONS: Priority[] = Object.values(PRIORITY)
export const STATUS_OPTIONS: Status[] = Object.values(STATUS)

export const getCardBorderClass = (priority: Priority) => {
  switch (priority) {
    case PRIORITY.ALTA:
      return 'border-red-500'
    case PRIORITY.MEDIA:
      return 'border-yellow-400'
    case PRIORITY.BAIXA:
      return 'border-green-400'
  }
}

export const getBadgeColor = (priority: Priority) => {
  switch (priority) {
    case PRIORITY.ALTA:
      return 'red'
    case PRIORITY.MEDIA:
      return 'yellow'
    case PRIORITY.BAIXA:
      return 'green'
  }
}