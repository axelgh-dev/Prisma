import { BoardCard } from './BoardCard'
import type { Board } from '@/domain/models/Board'

interface BoardGridProps {
  boards: Board[]
  onEdit?: (board: Board) => void
  onDelete?: (id: string) => void
}

export function BoardGrid({ boards, onEdit, onDelete }: BoardGridProps) {
  if (boards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <p className="text-white/40 text-sm">Aún no tienes tableros</p>
        <p className="text-white/30 text-xs">Crea el primero con el botón de arriba</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center px-5 mt-5">
      <div className="grid grid-cols-3 gap-8">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            onEdit={() => onEdit?.(board)}
            onDelete={() => onDelete?.(board.id)}
          />
        ))}
      </div>
    </div>
  )
}