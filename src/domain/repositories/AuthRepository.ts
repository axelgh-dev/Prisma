import type { AuthCredentials, AuthSession } from '@/domain/models/User'

export interface AuthRepository {
  login(credentials: AuthCredentials): Promise<AuthSession>
  logout(): Promise<void>
  refreshToken(token: string): Promise<AuthSession>
}