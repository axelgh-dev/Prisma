import type { Tag } from '@/domain/models/Tag'

interface TagChipProps {
  tag: Tag
  size?: 'sm' | 'md'
}

export function TagChip({ tag, size = 'md' }: TagChipProps) {
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium text-white shadow-sm ${sizes[size]}`}
      style={{ backgroundColor: tag.color }}
    >
      {tag.name}
    </span>
  )
}