import { GlassCard } from '@/presentation/components/ui/GlassCard'
import { LoginForm } from '@/presentation/modules/auth/components/LoginForm'

export function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">

      {/* Orbes Frutiger Aero */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00C9B1]/25 blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0077FF]/30 blur-[120px]" />
      <div className="absolute top-[30%] right-[20%] w-64 h-64 rounded-full bg-[#00E5FF]/15 blur-[80px]" />
      <div className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-full bg-[#00C9B1]/20 blur-[60px]" />

      {/* Orbes naranjas */}
      <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full bg-[#FF6B00]/20 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[5%] w-56 h-56 rounded-full bg-[#FF8C00]/15 blur-[80px]" />

      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00C9B1]/25 blur-[120px]" />
      <div className="absolute top-[30%] right-[20%] w-64 h-64 rounded-full bg-[#00E5FF]/15 blur-[80px]" />
      <div className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-full bg-[#00C9B1]/20 blur-[60px]" />
      <div className="absolute top-[60%] left-[40%] w-32 h-32 rounded-full bg-[#00C9B1]/15 blur-[50px]" />

      {/* Orbes azules */}
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0077FF]/30 blur-[120px]" />
      <div className="absolute top-[15%] left-[35%] w-56 h-56 rounded-full bg-[#0099FF]/15 blur-[90px]" />
      <div className="absolute bottom-[35%] right-[5%] w-40 h-40 rounded-full bg-[#00B4FF]/20 blur-[60px]" />

      {/* Orbes naranjas */}
      <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full bg-[#FF6B00]/20 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[5%] w-56 h-56 rounded-full bg-[#FF8C00]/15 blur-[80px]" />
      <div className="absolute top-[45%] right-[30%] w-36 h-36 rounded-full bg-[#FF6B00]/10 blur-[60px]" />

      {/* Orbe blanco detrás de la card */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-white/8 blur-[90px]" />

      {/* Card */}
      <GlassCard className="relative w-full max-w-md p-8 z-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/20 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-white">Bienvenido</h1>
            <p className="text-sm text-white/50">Inicia sesión para continuar</p>
          </div>
          <LoginForm />
        </div>
      </GlassCard>

    </div>
  )
}