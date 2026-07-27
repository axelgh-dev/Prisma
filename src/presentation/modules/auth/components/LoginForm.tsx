import { useState } from 'react'
import { Input } from '@/presentation/components/ui/Input'
import { Button } from '@/presentation/components/ui/Button'
import { ErrorMessage } from '@/presentation/components/feedback/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setSession } = useAuthStore()
  const navigate = useNavigate()

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault()
    setError(null)

    if (!username.trim()) {
      setError('El nombre de usuario es requerido')
      return
    }
    if (!password) {
      setError('La contraseña es requerida')
      return
    }

    setIsLoading(true)
    setSession({
      user: {
        id: crypto.randomUUID(),
        name: username.trim(),
        email: '',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      accessToken: 'mock',
      refreshToken: 'mock',
      expiresAt: Date.now() + 1000 * 60 * 60 * 8,
    })
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Usuario"
        type="text"
        placeholder="Tu nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <Input
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        iconRight={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-white hover:text-white/80 transition-colors cursor-pointer"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        }
      />
      <ErrorMessage message={error} />
      <Button type="submit" fullWidth loading={isLoading}>
        Iniciar sesión
      </Button>
    </form>
  )
}