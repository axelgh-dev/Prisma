import { useState } from 'react'
import { MainLayout } from '@/presentation/components/layout/MainLayout'
import { GlassCard } from '@/presentation/components/ui/GlassCard'
import { Button } from '@/presentation/components/ui/Button'
import { Modal } from '@/presentation/components/ui/Modal'
import { ConfirmDialog } from '@/presentation/components/ui/ConfirmDialog'
import { TagGrid } from '@/presentation/modules/dashboard/tags/components/TagGrid'
import { CreateTagForm } from '@/presentation/modules/dashboard/tags/components/CreateTagForm'
import { useTags } from '@/presentation/modules/dashboard/tags/hooks/useTags'
import type { Tag } from '@/domain/models/Tag'

export function TagsPage() {
  const { tags, addTag, updateTag, removeTag, error, setError } = useTags()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  function handleClose() {
    setIsModalOpen(false)
    setEditingTag(null)
    setError(null)
  }

  return (
    <MainLayout>
      <GlassCard className="flex-1 flex flex-col p-6 gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium text-white/80">Etiquetas</h2>
            <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
              {tags.length}
            </span>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            + Nueva etiqueta
          </Button>
        </div>
        <TagGrid
          tags={tags}
          onDelete={setPendingDeleteId}
          onEdit={(tag) => {
            setEditingTag(tag)
            setIsModalOpen(true)
          }}
        />
      </GlassCard>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <CreateTagForm
          initialTag={editingTag}
          onSubmit={(name, color) =>
            editingTag ? updateTag(editingTag.id, name, color) : addTag(name, color)
          }
          onSuccess={() => {
            setIsModalOpen(false)
            setEditingTag(null)
          }}
          error={error}
        />
      </Modal>

      <ConfirmDialog
        isOpen={pendingDeleteId !== null}
        title="Eliminar etiqueta"
        description="Esta acción no se puede deshacer. ¿Deseas continuar?"
        onConfirm={() => {
          if (pendingDeleteId) removeTag(pendingDeleteId)
          setPendingDeleteId(null)
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </MainLayout>
  )
}