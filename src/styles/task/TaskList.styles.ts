import { PRIORITY, STATUS, Priority, Status } from '@/domain/enums/TaskEnums'

export const PRIORITY_OPTIONS: Priority[] = Object.values(PRIORITY)
export const STATUS_OPTIONS: Status[] = Object.values(STATUS)

export const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}