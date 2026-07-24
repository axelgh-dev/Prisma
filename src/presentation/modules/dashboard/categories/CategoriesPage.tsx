import { useState } from 'react'
import { MainLayout } from '@/presentation/components/layout/MainLayout'
import { GlassCard } from '@/presentation/components/ui/GlassCard'
import { Button } from '@/presentation/components/ui/Button'
import { Modal } from '@/presentation/components/ui/Modal'
import { CategoryList } from '@/presentation/modules/dashboard/categories/components/CategoryList'
import { CreateCategoryForm } from '@/presentation/modules/dashboard/categories/components/CreateCategoryForm'
import { useCategories } from '@/presentation/modules/dashboard/categories/hooks/useCategories'
import { ConfirmDialog } from '@/presentation/components/ui/ConfirmDialog'
import type { Category } from '@/domain/models/Category'

export function CategoriesPage() {
  const { categories, addCategory, removeCategory, updateCategory, error, setError } = useCategories()
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleClose() {
    setIsModalOpen(false)
    setError(null)
  }

  return (
    <MainLayout>
      <GlassCard className="flex-1 flex flex-col p-6 gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium text-white/80">Categorías</h2>
            <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
              {categories.length}
            </span>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            + Nueva categoría
          </Button>
        </div>
        <CategoryList
          categories={categories}
          onDelete={setPendingDeleteId}
          onEdit={(category) => {
            setEditingCategory(category)
            setIsModalOpen(true)
          }}
        />
      </GlassCard>

      <Modal isOpen={isModalOpen} onClose={() => { handleClose(); setEditingCategory(null) }}>
        <CreateCategoryForm
          initialCategory={editingCategory}
          onSubmit={(name, color) =>
            editingCategory
              ? updateCategory(editingCategory.id, name, color)
              : addCategory(name, color)
          }
          onSuccess={() => {
            setIsModalOpen(false)
            setEditingCategory(null)
          }}
          error={error}
        />
      </Modal>

      <ConfirmDialog
        isOpen={pendingDeleteId !== null}
        title="Eliminar categoría"
        description="Esta acción no se puede deshacer. ¿Deseas continuar?"
        onConfirm={() => {
          if (pendingDeleteId) removeCategory(pendingDeleteId)
          setPendingDeleteId(null)
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </MainLayout>
  )
}