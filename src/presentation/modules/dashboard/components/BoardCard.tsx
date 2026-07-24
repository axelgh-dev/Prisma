import { useNavigate } from 'react-router-dom'
import type { Board } from '@/domain/models/Board'

interface BoardCardProps {
  board: Board
  onEdit?: () => void
  onDelete?: () => void
}

export function BoardCard({ board, onEdit, onDelete }: BoardCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="group relative w-64 aspect-[4/3] rounded-2xl p-5 flex flex-col justify-between items-start border border-white/20 transition-transform hover:-translate-y-1"
      style={{ backgroundColor: board.color }}
    >
      {/* Acciones */}
      <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit?.() }}
          className="w-7 h-7 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete?.() }}
          className="w-7 h-7 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-300 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      {/* Ícono */}
      <div
        className="w-9 h-9 rounded-lg bg-white/25 flex items-center justify-center cursor-pointer"
        onClick={() => navigate(`/kanban/${board.id}`)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </div>

      {/* Info */}
      <div
        className="flex flex-col gap-0.5 cursor-pointer w-full"
        onClick={() => navigate(`/kanban/${board.id}`)}
      >
        <span className="text-white font-medium drop-shadow-sm">{board.name}</span>
        <span className="text-white/70 text-xs">{board.taskCount} tareas</span>
      </div>
    </div>
  )
}