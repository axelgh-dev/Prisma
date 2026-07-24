import type { Tag } from '@/domain/models/Tag'

export interface TagValidationError {
  name?: string
}

export function validateTagName(name: string, existingTags: Tag[]): TagValidationError {
  const errors: TagValidationError = {}
  const trimmed = name.trim()

  if (!trimmed) {
    errors.name = 'El nombre es requerido'
  } else if (trimmed.length < 2) {
    errors.name = 'Mínimo 2 caracteres'
  } else if (existingTags.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
    errors.name = 'Ya existe una etiqueta con ese nombre'
  }

  return errors
}