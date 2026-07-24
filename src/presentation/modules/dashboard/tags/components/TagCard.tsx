import type { Tag } from '@/domain/models/Tag'

interface TagCardProps {
  tag: Tag
  onEdit?: () => void
  onDelete?: () => void
}

export function TagCard({ tag, onEdit, onDelete }: TagCardProps) {
  return (
    <div
      className="group relative flex items-center justify-between px-4 py-3 rounded-xl border border-white/30 backdrop-blur-md transition-all hover:scale-[1.02] cursor-default"
      style={{
        backgroundColor: `${tag.color}CC`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 16px rgba(0,0,0,0.15)`
      }}
    >
      <span className="text-white font-medium text-sm drop-shadow-sm">{tag.name}</span>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="text-white/60 hover:text-red-200 transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}