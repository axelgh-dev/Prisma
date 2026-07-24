import { Button } from '@/presentation/components/ui/Button'

interface DashboardHeaderProps {
  onCreateBoard?: () => void
}

export function DashboardHeader({ onCreateBoard }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <h2 className="text-xl font-medium text-white/80">
        Crea. Organiza. Potencializa
      </h2>
      <Button variant="primary" size="md" onClick={onCreateBoard}>
        + Crear tablero
      </Button>
    </div>
  )
}