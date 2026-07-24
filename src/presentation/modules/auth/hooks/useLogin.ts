import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUseCase, validateLoginCredentials } from '@/application/useCases/auth/loginUseCase'
import type { LoginValidationError } from '@/application/useCases/auth/loginUseCase'
import { authApi } from '@/infrastructure/api/authApi'
import { useAuthStore } from '@/store/authStore'
import type { AuthCredentials } from '@/domain/models/User'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<LoginValidationError>({})
  const { setSession } = useAuthStore()
  const navigate = useNavigate()

  async function login(credentials: AuthCredentials) {
    setServerError(null)
    const errors = validateLoginCredentials(credentials)
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    setValidationErrors({})
    setIsLoading(true)
    try {
      const session = await loginUseCase(credentials, authApi)
      setSession(session)
      navigate('/dashboard')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, serverError, validationErrors }
}