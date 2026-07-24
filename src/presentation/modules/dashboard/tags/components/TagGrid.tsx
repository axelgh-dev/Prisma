import { TagCard } from './TagCard'
import type { Tag } from '@/domain/models/Tag'

interface TagGridProps {
  tags: Tag[]
  onEdit?: (tag: Tag) => void
  onDelete?: (id: string) => void
}

export function TagGrid({ tags, onEdit, onDelete }: TagGridProps) {
  if (tags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-white/40 text-sm">Aún no tienes etiquetas</p>
        <p className="text-white/30 text-xs mt-1">Crea la primera con el botón de arriba</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-3 back">
      {tags.map((tag) => (
        <TagCard
          key={tag.id}
          tag={tag}
          onEdit={() => onEdit?.(tag)}
          onDelete={() => onDelete?.(tag.id)}
        />
      ))}
    </div>
  )
}