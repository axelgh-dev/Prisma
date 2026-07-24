import { useState } from 'react'
import { MainLayout } from '@/presentation/components/layout/MainLayout'
import { GlassCard } from '@/presentation/components/ui/GlassCard'
import { Modal } from '@/presentation/components/ui/Modal'
import { ConfirmDialog } from '@/presentation/components/ui/ConfirmDialog'
import { DashboardHeader } from '@/presentation/modules/dashboard/components/DashboardHeader'
import { BoardGrid } from '@/presentation/modules/dashboard/components/BoardGrid'
import { CreateBoardForm } from '@/presentation/modules/dashboard/components/CreateBoardForm'
import { useBoards } from '@/presentation/modules/dashboard/hooks/useBoards'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { mockUser } from '@/presentation/modules/dashboard/mockUser'
import type { Board } from '@/domain/models/Board'

export function DashboardPage() {
  const { setSession } = useAuthStore()
  
  const { boards, addBoard, updateBoard, removeBoard, getBoardTaskCount, error, setError } = useBoards()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBoard, setEditingBoard] = useState<Board | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setSession({
      user: mockUser,
      accessToken: 'mock',
      refreshToken: 'mock',
      expiresAt: Date.now() + 1000 * 60 * 60,
    })
  }, [])

  function handleClose() {
    setIsModalOpen(false)
    setEditingBoard(null)
    setError(null)
  }

  return (
    <MainLayout>
      <GlassCard className="flex-1 flex flex-col">
        <DashboardHeader onCreateBoard={() => setIsModalOpen(true)} />
        <BoardGrid
          boards={boards.map((b) => ({ ...b, taskCount: getBoardTaskCount(b.id) }))}
          onEdit={(board) => {
            setEditingBoard(board)
            setIsModalOpen(true)
          }}
          onDelete={setPendingDeleteId}
        />
      </GlassCard>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <CreateBoardForm
          initialBoard={editingBoard}
          onSubmit={(name, color) =>
            editingBoard
              ? updateBoard(editingBoard.id, name, color)
              : addBoard(name, color)
          }
          onSuccess={() => {
            setIsModalOpen(false)
            setEditingBoard(null)
          }}
          error={error}
        />
      </Modal>

      <ConfirmDialog
        isOpen={pendingDeleteId !== null}
        title="Eliminar tablero"
        description="Se eliminarán también todas las tareas de este tablero. ¿Deseas continuar?"
        onConfirm={() => {
          if (pendingDeleteId) removeBoard(pendingDeleteId)
          setPendingDeleteId(null)
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </MainLayout>
  )
}