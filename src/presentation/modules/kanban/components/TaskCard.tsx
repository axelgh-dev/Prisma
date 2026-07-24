import type { Task } from '@/domain/models/Task'
import { TagChip } from '@/presentation/components/ui/TagChip'
import type { Tag } from '@/domain/models/Tag'
import { COLUMN_LABELS, COLUMN_COLORS, COLUMNS, type KanbanColumn } from '@/domain/models/Task'

interface TaskCardProps {
  task: Task
  tags?: Tag[]
  onEdit?: () => void
  onDelete?: () => void
  onMove?: (column: KanbanColumn) => void
}

export function TaskCard({ task, tags, onEdit, onDelete, onMove }: TaskCardProps) {
  return (
    <div
      className="group relative flex flex-col gap-2 p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all cursor-default overflow-hidden"
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.20), 0 4px 12px rgba(0,0,0,0.10)'
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: COLUMN_COLORS[task.column] }}
      />
      <div className="pl-2">
        <p className="text-white text-sm font-medium leading-snug">{task.title}</p>
        {task.description && (
          <p className="text-white/50 text-xs leading-relaxed mt-1">{task.description}</p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag) => (
              <TagChip key={tag.id} tag={tag} size="sm" />
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-1 pl-2 items-center justify-between">
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-white/40 hover:text-white transition-colors cursor-pointer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button onClick={onDelete} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
        <div className="flex gap-1">
          {COLUMNS.filter((col) => col !== task.column).map((col) => (
            <button
              key={col}
              onClick={() => onMove?.(col)}
              className="w-3 h-3 rounded-full border border-white/30 transition-transform hover:scale-125 cursor-pointer"
              style={{ backgroundColor: COLUMN_COLORS[col] }}
              title={`Mover a: ${COLUMN_LABELS[col]}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}