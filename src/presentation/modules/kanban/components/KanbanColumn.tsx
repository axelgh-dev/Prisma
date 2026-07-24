import { TaskCard } from './TaskCard'
import type { Tag } from '@/domain/models/Tag'
import type { Task, KanbanColumn as KanbanColumnType } from '@/domain/models/Task'
import { COLUMN_LABELS, COLUMN_COLORS } from '@/domain/models/Task'

interface KanbanColumnProps {

  column: KanbanColumnType
  tasks: Task[]
  tags?: Tag[]

  onAddTask?: () => void
  onEditTask?: (task: Task) => void
  onDeleteTask?: (taskId: string) => void
  onMoveTask?: (taskId: string, column: KanbanColumnType) => void
}

export function KanbanColumn({ column, tasks, tags, onAddTask, onEditTask, onDeleteTask, onMoveTask }: KanbanColumnProps) {
  return (
    <div className="flex flex-col gap-3 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm font-medium">{COLUMN_LABELS[column]}</span>
          <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className="text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Tasks */}
      <div
        className="flex flex-col gap-2 rounded-xl p-3 border bg-white/5 overflow-y-auto"
        style={{
          borderColor: `${COLUMN_COLORS[column]}40`,
          maxHeight: 'calc(100vh - 260px)'
        }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            tags={tags?.filter((tag) => task.tagIds.includes(tag.id))}
            onEdit={() => onEditTask?.(task)}
            onDelete={() => onDeleteTask?.(task.id)}
            onMove={(col) => onMoveTask?.(task.id, col)}
          />
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-full py-8">
            <p className="text-white/20 text-xs">Sin tareas</p>
          </div>
        )}
      </div>
    </div>
  )
}