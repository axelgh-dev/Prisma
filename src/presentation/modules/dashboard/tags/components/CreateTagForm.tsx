import { useState, useEffect } from 'react'
import { Input } from '@/presentation/components/ui/Input'
import { Button } from '@/presentation/components/ui/Button'
import type { Tag } from '@/domain/models/Tag'

const COLORS = ['#FF6B6B', '#FFB020', '#26416B', '#B98EDB', '#8FAEDB', '#FF6B00', '#00C9B1', '#D4A185']

interface CreateTagFormProps {
  initialTag?: Tag | null
  onSubmit: (name: string, color: string) => boolean
  onSuccess: () => void
  error: string | null
}

export function CreateTagForm({ initialTag, onSubmit, onSuccess, error }: CreateTagFormProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])

  useEffect(() => {
    if (initialTag) {
      setName(initialTag.name)
      setColor(initialTag.color)
    } else {
      setName('')
      setColor(COLORS[0])
    }
  }, [initialTag])

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault()
    const success = onSubmit(name, color)
    if (success) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-white">
        {initialTag ? 'Editar etiqueta' : 'Nueva etiqueta'}
      </h3>
      <Input
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error ?? undefined}
        placeholder="Ej. Urgente"
      />
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-white/60">Color</span>
        <div className="flex gap-2 flex-wrap">
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
        {initialTag ? 'Guardar cambios' : 'Crear etiqueta'}
      </Button>
    </form>
  )
}