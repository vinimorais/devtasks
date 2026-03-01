export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const

export const STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const

export type Priority = typeof PRIORITY[keyof typeof PRIORITY]
export type Status = typeof STATUS[keyof typeof STATUS]