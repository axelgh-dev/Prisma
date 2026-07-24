import { useState, useEffect } from 'react'
import { Input } from '@/presentation/components/ui/Input'
import { Button } from '@/presentation/components/ui/Button'
import { BOARD_COLORS } from '@/lib/boardColors'
import type { Board } from '@/domain/models/Board'

interface CreateBoardFormProps {
  initialBoard?: Board | null
  onSubmit: (name: string, color: string) => boolean
  onSuccess: () => void
  error: string | null
}

export function CreateBoardForm({ initialBoard, onSubmit, onSuccess, error }: CreateBoardFormProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState<string>(BOARD_COLORS[0].value)

  useEffect(() => {
    if (initialBoard) {
      setName(initialBoard.name)
      setColor(initialBoard.color)
    } else {
      setName('')
      setColor(BOARD_COLORS[0].value)
    }
  }, [initialBoard])

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault()
    const success = onSubmit(name, color)
    if (success) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-white">
        {initialBoard ? 'Editar tablero' : 'Nuevo tablero'}
      </h3>
      <Input
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error ?? undefined}
        placeholder="Ej. Proyecto Alpha"
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-white/60">Color</span>
        <div className="grid grid-cols-5 gap-2">
          {BOARD_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setColor(c.value)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                color === c.value ? 'border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>
      </div>
      <div
        className="w-full h-12 rounded-xl border border-white/20 transition-all"
        style={{ backgroundColor: color }}
      />
      <Button type="submit" fullWidth>
        {initialBoard ? 'Guardar cambios' : 'Crear tablero'}
      </Button>
    </form>
  )
}