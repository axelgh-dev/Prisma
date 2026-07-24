import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '@/presentation/components/layout/MainLayout'
import { GlassCard } from '@/presentation/components/ui/GlassCard'
import { Modal } from '@/presentation/components/ui/Modal'
import { ConfirmDialog } from '@/presentation/components/ui/ConfirmDialog'
import { KanbanColumn } from '@/presentation/modules/kanban/components/KanbanColumn'
import { CreateTaskForm } from '@/presentation/modules/kanban/components/CreateTaskForm'
import { useKanban } from '@/presentation/modules/kanban/hooks/useKanban'
import { COLUMNS } from '@/domain/models/Task'
import type { Task, KanbanColumn as KanbanColumnType } from '@/domain/models/Task'
import { useTags } from '@/presentation/modules/dashboard/tags/hooks/useTags'
import { mockBoards } from '@/presentation/modules/dashboard/mockBoard'
import { Button } from '@/presentation/components/ui/Button'

export function KanbanPage() {
  const navigate = useNavigate()
  const { boardId = '1' } = useParams()
  const board = mockBoards.find((b) => b.id === boardId)
  const { tags } = useTags()
  const { getColumnTasks, tasks, addTask, moveTask, updateTask, removeTask, error, setError } = useKanban(boardId)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [defaultColumn, setDefaultColumn] = useState<KanbanColumnType>('todo')
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  function handleClose() {
    setIsModalOpen(false)
    setEditingTask(null)
    setError(null)
  }

  function handleAddTask(column: KanbanColumnType) {
    setDefaultColumn(column)
    setEditingTask(null)
    setIsModalOpen(true)
  }

  return (
    <MainLayout>
      <GlassCard className="flex-1 flex flex-col p-6 gap-6 overflow-hidden" style={{ height: 'calc(100vh - 2rem)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: board?.color ?? '#fff' }}
            />
            <h2 className="text-xl font-medium text-white/80">
              {board?.name ?? 'Tablero'}
            </h2>
            <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
              {tasks.length} tareas
            </span>
          </div>
          <Button variant="primary" size="sm" onClick={() => handleAddTask('todo')}>
            + Nueva tarea
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4 flex-1 overflow-hidden">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column}
              column={column}
              tasks={getColumnTasks(column)}
              tags={tags}
              onAddTask={() => handleAddTask(column)}
              onEditTask={(task) => {
                setEditingTask(task)
                setIsModalOpen(true)
              }}
              onDeleteTask={setPendingDeleteId}
              onMoveTask={moveTask}
            />
          ))}
        </div>
      </GlassCard>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <CreateTaskForm
          initialTask={editingTask}
          defaultColumn={defaultColumn}
          availableTags={tags}
          onSubmit={(title, column, description, tagIds) =>
            editingTask
              ? updateTask(editingTask.id, title, description, tagIds)
              : addTask(title, column, description, tagIds)
          }
          onSuccess={() => {
            setIsModalOpen(false)
            setEditingTask(null)
          }}
          error={error}
        />
      </Modal>

      <ConfirmDialog
        isOpen={pendingDeleteId !== null}
        title="Eliminar tarea"
        description="Esta acción no se puede deshacer. ¿Deseas continuar?"
        onConfirm={() => {
          if (pendingDeleteId) removeTask(pendingDeleteId)
          setPendingDeleteId(null)
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </MainLayout>
  )
}