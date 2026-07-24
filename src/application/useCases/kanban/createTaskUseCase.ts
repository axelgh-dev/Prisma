export interface TaskValidationError {
  title?: string
}

export function validateTask(title: string): TaskValidationError {
  const errors: TaskValidationError = {}
  const trimmed = title.trim()

  if (!trimmed) {
    errors.title = 'El título es requerido'
  } else if (trimmed.length < 3) {
    errors.title = 'Mínimo 3 caracteres'
  }

  return errors
}