import { useState, useEffect } from 'react'
import { Input } from '@/presentation/components/ui/Input'
import { Button } from '@/presentation/components/ui/Button'
import type { Category } from '@/domain/models/Category'

const COLORS = ['#26416B', '#B98EDB', '#D4A185', '#8FAEDB', '#00C9B1', '#FF6B00']

interface CreateCategoryFormProps {
  initialCategory?: Category | null
  onSubmit: (name: string, color: string) => boolean
  onSuccess: () => void
  error: string | null
}

export function CreateCategoryForm({ initialCategory, onSubmit, onSuccess, error }: CreateCategoryFormProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])

  useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name)
      setColor(initialCategory.color)
    } else {
      setName('')
      setColor(COLORS[0])
    }
  }, [initialCategory])

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault()
    const success = onSubmit(name, color)
    if (success) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-white">
        {initialCategory ? 'Editar categoría' : 'Nueva categoría'}
      </h3>
      <Input
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error ?? undefined}
        placeholder="Ej. Viajes"
      />
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-white/60">Color</span>
        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                color === c ? 'border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
      <Button type="submit" fullWidth>
        {initialCategory ? 'Guardar cambios' : 'Crear categoría'}
      </Button>
    </form>
  )
}