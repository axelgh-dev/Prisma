import type { Category } from '@/domain/models/Category'

export interface CategoryValidationError {
  name?: string
}

export function validateCategoryName(
  name: string,
  existingCategories: Category[]
): CategoryValidationError {
  const errors: CategoryValidationError = {}
  const trimmed = name.trim()

  if (!trimmed) {
    errors.name = 'El nombre es requerido'
  } else if (trimmed.length < 2) {
    errors.name = 'Mínimo 2 caracteres'
  } else if (existingCategories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
    errors.name = 'Ya existe una categoría con ese nombre'
  }

  return errors
}