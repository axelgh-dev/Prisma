import { useState, useEffect } from 'react'
import { validateTask } from '@/application/useCases/kanban/createTaskUseCase'
import { mockTasks } from '@/presentation/modules/kanban/mockTasks'
import type { Task, KanbanColumn } from '@/domain/models/Task'

const STORAGE_KEY = 'glassboard_tasks'

function loadTasks(): Task[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  return mockTasks
}

export function useKanban(boardId: string) {
  const [allTasks, setAllTasks] = useState<Task[]>(loadTasks)
  const [error, setError] = useState<string | null>(null)

  const tasks = allTasks.filter((t) => t.boardId === boardId)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks))
  }, [allTasks])

  function getColumnTasks(column: KanbanColumn) {
    return tasks.filter((t) => t.column === column).sort((a, b) => a.order - b.order)
  }

  function addTask(title: string, column: KanbanColumn, description?: string, tagIds: string[] = []) {
    const errors = validateTask(title)
    if (errors.title) {
      setError(errors.title)
      return false
    }
    const columnTasks = getColumnTasks(column)
    const newTask: Task = {
      id: crypto.randomUUID(),
      boardId,
      title: title.trim(),
      description,
      column,
      order: columnTasks.length,
      tagIds,
      createdAt: new Date().toISOString(),
    }
    setAllTasks((prev) => [...prev, newTask])
    setError(null)
    return true
  }

  function updateTask(taskId: string, title: string, description?: string, tagIds?: string[]) {
    const errors = validateTask(title)
    if (errors.title) {
      setError(errors.title)
      return false
    }
    setAllTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, title: title.trim(), description, tagIds: tagIds ?? t.tagIds }
          : t
      )
    )
    setError(null)
    return true
  }

  function moveTask(taskId: string, toColumn: KanbanColumn) {
    setAllTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: toColumn } : t))
    )
  }

  function removeTask(taskId: string) {
    setAllTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  return { tasks, getColumnTasks, addTask, moveTask, removeTask, updateTask, error, setError }
}