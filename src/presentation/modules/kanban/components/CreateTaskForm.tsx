import { useState, useEffect } from 'react'
import { Input } from '@/presentation/components/ui/Input'
import { Button } from '@/presentation/components/ui/Button'
import { COLUMN_LABELS, COLUMNS } from '@/domain/models/Task'
import type { Task, KanbanColumn } from '@/domain/models/Task'
import { TagChip } from '@/presentation/components/ui/TagChip'
import type { Tag } from '@/domain/models/Tag'
import { MAX_TAGS_PER_BOARD } from '@/domain/models/Tag'

interface CreateTaskFormProps {
  initialTask?: Task | null
  defaultColumn?: KanbanColumn
  availableTags?: Tag[]
  onSubmit: (title: string, column: KanbanColumn, description?: string, tagIds?: string[]) => boolean
  onSuccess: () => void
  error: string | null
}

export function CreateTaskForm({ initialTask, defaultColumn = 'todo', availableTags, onSubmit, onSuccess, error }: CreateTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [column, setColumn] = useState<KanbanColumn>(defaultColumn)

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description ?? '')
      setColumn(initialTask.column)
      setSelectedTagIds(initialTask.tagIds)
    } else {
      setTitle('')
      setDescription('')
      setColumn(defaultColumn)
      setSelectedTagIds([])
    }
  }, [initialTask, defaultColumn])

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault()
    const success = onSubmit(title, column, description || undefined, selectedTagIds)
    if (success) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-white">
        {initialTask ? 'Editar tarea' : 'Nueva tarea'}
      </h3>
      <Input
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error ?? undefined}
        placeholder="Ej. Diseñar mockup"
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/60">Descripción (opcional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalles de la tarea..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm text-white bg-white/8 border border-white/18 backdrop-blur-sm placeholder:text-white/30 outline-none focus:bg-white/12 focus:border-blue-400/70 resize-none transition-all"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/60">Columna</label>
        <div className="grid grid-cols-2 gap-2">
          {COLUMNS.map((col) => (
            <button
              key={col}
              type="button"
              onClick={() => setColumn(col)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${column === col
                ? 'bg-white/20 border-white/40 text-white'
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
            >
              {COLUMN_LABELS[col]}
            </button>
          ))}
        </div>
      </div>
      {availableTags && availableTags.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-white/60">
            Etiquetas <span className="text-white/30">(máx. {MAX_TAGS_PER_BOARD})</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const selected = selectedTagIds.includes(tag.id)
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    if (selected) {
                      setSelectedTagIds((prev) => prev.filter((id) => id !== tag.id))
                    } else if (selectedTagIds.length < MAX_TAGS_PER_BOARD) {
                      setSelectedTagIds((prev) => [...prev, tag.id])
                    }
                  }}
                  className={`transition-all rounded-full border-2 ${selected ? 'border-white scale-105' : 'border-transparent opacity-60'
                    }`}
                >
                  <TagChip tag={tag} size="sm" />
                </button>
              )
            })}
          </div>
        </div>
      )}
      <Button type="submit" fullWidth>
        {initialTask ? 'Guardar cambios' : 'Crear tarea'}
      </Button>
    </form>
  )
}