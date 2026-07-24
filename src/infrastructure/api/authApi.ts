import { httpClient } from '@/infrastructure/http/httpClient'
import { tokenStorage } from '@/infrastructure/storage/tokenStorage'
import type { AuthRepository } from '@/domain/repositories/AuthRepository'
import type { AuthCredentials, AuthSession } from '@/domain/models/User'

export const authApi: AuthRepository = {
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    const { data } = await httpClient.post<AuthSession>('/auth/login', credentials)
    tokenStorage.saveTokens(data.accessToken, data.refreshToken, data.expiresAt)
    return data
  },

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout').catch(() => {})
    tokenStorage.clear()
  },

  async refreshToken(token: string): Promise<AuthSession> {
    const { data } = await httpClient.post<AuthSession>('/auth/refresh', { token })
    tokenStorage.saveTokens(data.accessToken, data.refreshToken, data.expiresAt)
    return data
  },
}