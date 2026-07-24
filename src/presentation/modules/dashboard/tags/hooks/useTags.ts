import { useState, useEffect } from 'react'
import { validateTagName } from '@/application/useCases/tags/createTagUseCase'
import { mockTags } from '@/presentation/modules/dashboard/mockTags'
import type { Tag } from '@/domain/models/Tag'

const STORAGE_KEY = 'glassboard_tags'

function loadTags(): Tag[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  return mockTags
}

export function useTags() {
  const [tags, setTags] = useState<Tag[]>(loadTags)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tags))
  }, [tags])

  function addTag(name: string, color: string) {
    const errors = validateTagName(name, tags)
    if (errors.name) {
      setError(errors.name)
      return false
    }
    setTags((prev) => [...prev, { id: crypto.randomUUID(), name: name.trim(), color }])
    setError(null)
    return true
  }

  function updateTag(id: string, name: string, color: string) {
    const errors = validateTagName(name, tags.filter((t) => t.id !== id))
    if (errors.name) {
      setError(errors.name)
      return false
    }
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, name: name.trim(), color } : t)))
    setError(null)
    return true
  }

  function removeTag(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id))
  }

  return { tags, addTag, updateTag, removeTag, error, setError }
}