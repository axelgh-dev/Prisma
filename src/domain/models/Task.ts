export type KanbanColumn = 'objectives' | 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  boardId: string
  title: string
  description?: string
  column: KanbanColumn
  order: number
  tagIds: string[]
  createdAt: string
}

export const COLUMN_COLORS: Record<KanbanColumn, string> = {
  objectives: '#B98EDB',
  todo: '#FFB347',
  in_progress: '#FF6B6B',
  done: '#00D68F',
}

export const COLUMN_LABELS: Record<KanbanColumn, string> = {
  objectives: 'Objetivos generales',
  todo: 'Por hacer',
  in_progress: 'En progreso',
  done: 'Hecho',
}

export const COLUMNS: KanbanColumn[] = ['objectives', 'todo', 'in_progress', 'done']