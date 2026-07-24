import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

import { LoginPage } from '@/presentation/modules/auth/LoginPage'

import { DashboardPage } from '@/presentation/modules/dashboard/DashboardPage'
import { CategoriesPage } from '@/presentation/modules/dashboard/categories/CategoriesPage'
import { TagsPage } from '@/presentation/modules/dashboard/tags/TagsPage'
import { KanbanPage } from '@/presentation/modules/kanban/KanbanPage'



function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/tags" element={<TagsPage />} />

        <Route path="/kanban/:boardId" element={<KanbanPage />} />
        <Route path="/board3d" element={<PrivateRoute><div>Board 3D</div></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}