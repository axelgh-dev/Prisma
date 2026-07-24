import { useState, useEffect } from 'react'
import { validateCategoryName } from '@/application/useCases/categories/createCategoryUseCase'
import { mockCategories } from '@/presentation/modules/dashboard/mockCategories'
import type { Category } from '@/domain/models/Category'

const STORAGE_KEY = 'glassboard_categories'

function loadCategories(): Category[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  return mockCategories
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(loadCategories)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
  }, [categories])

  function addCategory(name: string, color: string) {
    const errors = validateCategoryName(name, categories)
    if (errors.name) {
      setError(errors.name)
      return false
    }
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: name.trim(),
      color,
    }
    setCategories((prev) => [...prev, newCategory])
    setError(null)
    return true
  }

  function removeCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  function updateCategory(id: string, name: string, color: string) {
    const errors = validateCategoryName(name, categories.filter((c) => c.id !== id))
    if (errors.name) {
      setError(errors.name)
      return false
    }
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: name.trim(), color } : c))
    )
    setError(null)
    return true
  }

  return { categories, addCategory, removeCategory, updateCategory, error, setError }
}