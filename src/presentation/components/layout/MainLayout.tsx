import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'


interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen w-full flex gap-4 p-4 overflow-hidden">

      {/* Orbes Frutiger Aero */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00C9B1]/25 blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0077FF]/30 blur-[120px]" />
      <div className="absolute top-[30%] right-[20%] w-64 h-64 rounded-full bg-[#00E5FF]/15 blur-[80px]" />
      <div className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-full bg-[#00C9B1]/20 blur-[60px]" />
      <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full bg-[#FF6B00]/20 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[5%] w-56 h-56 rounded-full bg-[#FF8C00]/15 blur-[80px]" />

      <Sidebar />
      <main className="flex-1 flex flex-col gap-4 z-10">
        <TopBar />
        {children}
      </main>

    </div>
  )
}