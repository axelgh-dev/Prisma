import type { AuthRepository } from '@/domain/repositories/AuthRepository'
import type { AuthCredentials, AuthSession } from '@/domain/models/User'

export interface LoginValidationError {
  email?: string
  password?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function validateLoginCredentials(credentials: AuthCredentials): LoginValidationError {
  const errors: LoginValidationError = {}
  if (!credentials.email) errors.email = 'El correo es requerido'
  else if (!isValidEmail(credentials.email)) errors.email = 'Correo no válido'
  if (!credentials.password) errors.password = 'La contraseña es requerida'
  else if (credentials.password.length < 6) errors.password = 'Mínimo 6 caracteres'
  return errors
}

export async function loginUseCase(
  credentials: AuthCredentials,
  repo: AuthRepository
): Promise<AuthSession> {
  const errors = validateLoginCredentials(credentials)
  if (Object.keys(errors).length > 0) {
    throw Object.assign(new Error('Validation failed'), { validationErrors: errors })
  }
  return repo.login({
    email: credentials.email.trim().toLowerCase(),
    password: credentials.password,
  })
}