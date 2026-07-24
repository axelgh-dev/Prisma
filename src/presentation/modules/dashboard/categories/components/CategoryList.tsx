import { CategoryItem } from './CategoryItem'
import type { Category } from '@/domain/models/Category'

interface CategoryListProps {
  categories: Category[]
  onDelete?: (id: string) => void
  onEdit?: (category: Category) => void
}

export function CategoryList({ categories, onDelete, onEdit }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-white/40 text-sm">Aún no tienes categorías</p>
        <p className="text-white/30 text-xs mt-1">Crea la primera con el botón de arriba</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onDelete={() => onDelete?.(category.id)}
          onEdit={() => onEdit?.(category)}
        />
      ))}
    </div>
  )
}