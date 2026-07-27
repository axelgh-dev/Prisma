import type { Board } from '@/domain/models/Board'

export const mockBoards: Board[] = [
  { id: '1', name: 'Tablero Libre', color: '#2ca352ad', category: 'Trabajo', taskCount: 5, tagIds: [], createdAt: '', updatedAt: '' },
  { id: '2', name: 'Tablero Trabajo', color: '#ffee00d0', category: 'Consultoria', taskCount: 3, tagIds: [], createdAt: '', updatedAt: '' },
  { id: '3', name: 'Tablero Personal', color: '#356dc8df', category: 'Personal', taskCount: 7, tagIds: [], createdAt: '', updatedAt: '' },
  { id: '4', name: 'Tablero Proyecto Red', color: '#8FAEDB', category: 'Personal', taskCount: 2, tagIds: [], createdAt: '', updatedAt: '' },
  { id: '5', name: 'Tablero Proyecto Green', color: '#B98EDB', category: 'Consultoria', taskCount: 10, tagIds: [], createdAt: '', updatedAt: '' },
  { id: '6', name: 'Tablero Proyecto Blue', color: '#8FAEDB', category: 'Entretenimiento', taskCount: 8, tagIds: [], createdAt: '', updatedAt: '' },
]