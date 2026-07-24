import type { Board } from '@/domain/models/Board'

export interface BoardValidationError {
  name?: string
}

export function validateBoard(name: string, existingBoards: Board[]): BoardValidationError {
  const errors: BoardValidationError = {}
  const trimmed = name.trim()

  if (!trimmed) {
    errors.name = 'El nombre es requerido'
  } else if (trimmed.length < 2) {
    errors.name = 'Mínimo 2 caracteres'
  } else if (existingBoards.some((b) => b.name.toLowerCase() === trimmed.toLowerCase())) {
    errors.name = 'Ya existe un tablero con ese nombre'
  }

  return errors
}