import { useState, useEffect } from 'react'
import { validateBoard } from '@/application/useCases/boards/createBoardUseCase'
import { mockBoards } from '@/presentation/modules/dashboard/mockBoard'
import type { Board } from '@/domain/models/Board'

const STORAGE_KEY = 'glassboard_boards'

function loadBoards(): Board[] {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
    return mockBoards
}

export function useBoards() {
    const [boards, setBoards] = useState<Board[]>(loadBoards)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
    }, [boards])

    function addBoard(name: string, color: string) {
    const errors = validateBoard(name, boards)
    if (errors.name) {
        setError(errors.name)
        return false
    }
    const newBoard: Board = {
        id: crypto.randomUUID(),
        name: name.trim(),
        color,
        category: '',
        taskCount: 0,
        tagIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    setBoards((prev) => [...prev, newBoard])
    setError(null)
    return true
    }

    function updateBoard(id: string, name: string, color: string) {
    const errors = validateBoard(name, boards.filter((b) => b.id !== id))
    if (errors.name) {
        setError(errors.name)
        return false
    }
    setBoards((prev) =>
        prev.map((b) =>
        b.id === id ? { ...b, name: name.trim(), color, updatedAt: new Date().toISOString() } : b
        )
    )
    setError(null)
    return true
    }

    function removeBoard(id: string) {
    setBoards((prev) => prev.filter((b) => b.id !== id))
    const storedTasks = localStorage.getItem('glassboard_tasks')
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks)
        const filtered = tasks.filter((t: { boardId: string }) => t.boardId !== id)
        localStorage.setItem('glassboard_tasks', JSON.stringify(filtered))
    }
    }

    function getBoardTaskCount(boardId: string): number {
        const stored = localStorage.getItem('glassboard_tasks')
        if (!stored) return 0
        const tasks = JSON.parse(stored)
        return tasks.filter((t: { boardId: string }) => t.boardId === boardId).length
    }

    return { boards, addBoard, updateBoard, removeBoard, getBoardTaskCount, error, setError }
}