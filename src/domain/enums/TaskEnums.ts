export const PRIORITY = {
  BAIXA: 'baixa',
  MEDIA: 'media',
  ALTA: 'alta',
} as const

export const STATUS = {
  PENDENTE: 'pendente',
  EM_PROGRESSO: 'em progresso',
  CONCLUIDO: 'concluido',
} as const

export type Priority = typeof PRIORITY[keyof typeof PRIORITY]
export type Status = typeof STATUS[keyof typeof STATUS]