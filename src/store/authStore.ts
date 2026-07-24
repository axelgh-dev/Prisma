import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthSession } from '@/domain/models/User'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setSession: (session: AuthSession) => void
  clearSession: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setSession: (session) =>
        set({ user: session.user, isAuthenticated: true, isLoading: false }),
      clearSession: () =>
        set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)