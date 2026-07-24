import { useNavigate, useLocation } from 'react-router-dom'
import { GlassCard } from '@/presentation/components/ui/GlassCard'

const mainNav = [
  { label: 'Tableros', icon: '📋', path: '/dashboard' },
  { label: 'Categorías', icon: '🏷️', path: '/categories' },
  { label: 'Etiquetas', icon: '🔖', path: '/tags' },
  { label: 'Workers', icon: '👤', path: '/workers' },
]

const secondaryNav = [
  { label: 'Calendario', icon: '📅', path: '/calendar' },
  { label: 'Reportes', icon: '📊', path: '/reports' },
  { label: 'Métricas', icon: '📈', path: '/metrics' },
]

export function Sidebar() {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <GlassCard className="relative z-10 w-64 shrink-0 flex flex-col p-6">
      <div className="mb-10">
        <h1 className="text-lg font-semibold text-white">Glassboard</h1>
      </div>

      <nav className="flex flex-col gap-1">
        {mainNav.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
              location.pathname === item.path
                ? 'bg-white/15 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="my-6 h-px bg-white/15" />

      <nav className="flex flex-col gap-1">
        {secondaryNav.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
              location.pathname === item.path
                ? 'bg-white/15 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <p className="text-xs text-white/40">Glassboard v1.0.0</p>
      </div>
    </GlassCard>
  )
}