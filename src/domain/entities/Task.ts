import { Priority, Status } from '../enums/TaskEnums'

export interface BaseEntity {
  readonly id: string
  readonly createdAt: Date
}

export interface Task extends BaseEntity {
  title: string
  description: string
  priority: Priority
  status: Status
}