import { PRIORITY, STATUS, Priority, Status } from '@/domain/enums/TaskEnums'

export const PRIORITY_OPTIONS: Priority[] = Object.values(PRIORITY)
export const STATUS_OPTIONS: Status[] = Object.values(STATUS)

export const getCardBorderClass = (priority: Priority) => {
  switch (priority) {
    case PRIORITY.HIGH:
      return 'border-red-500'
    case PRIORITY.MEDIUM:
      return 'border-yellow-400'
    case PRIORITY.LOW:
      return 'border-green-400'
  }
}

export const getBadgeColor = (priority: Priority) => {
  switch (priority) {
    case PRIORITY.HIGH:
      return 'red'
    case PRIORITY.MEDIUM:
      return 'yellow'
    case PRIORITY.LOW:
      return 'green'
  }
}