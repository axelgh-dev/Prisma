export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string
  statusCode?: number
}

export type AppRoute = '/login' | '/dashboard' | '/kanban' | '/board3d'