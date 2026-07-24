import { useAuthStore } from '@/store/authStore'
import { GlassCard } from '@/presentation/components/ui/GlassCard'

export function TopBar() {
  const { user } = useAuthStore()

  return (
    <GlassCard className="grid grid-cols-3 items-center px-5 py-3">
      <div />
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-white/50 text-sm">Bienvenido de nuevo</p>
        <p className="text-white font-medium">{user?.name ?? 'Usuario'}</p>
      </div>
      <div className="flex justify-end">
        <button className="relative w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/15 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF6B00]" />
        </button>
      </div>
    </GlassCard>
  )
}