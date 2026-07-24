const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  EXPIRES_AT: 'expires_at',
} as const

export const tokenStorage = {
  saveTokens(access: string, refresh: string, expiresAt: number) {
    localStorage.setItem(KEYS.ACCESS_TOKEN, access)
    localStorage.setItem(KEYS.REFRESH_TOKEN, refresh)
    localStorage.setItem(KEYS.EXPIRES_AT, String(expiresAt))
  },
  getAccessToken: () => localStorage.getItem(KEYS.ACCESS_TOKEN),
  getRefreshToken: () => localStorage.getItem(KEYS.REFRESH_TOKEN),
  clear() {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
  },
}