import clsx from 'clsx'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function GlassCard({ children, className, style }: GlassCardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-white/30',
        'bg-black/40 backdrop-blur-2xl',
        className
      )}
      style={{
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.25),
          inset 0 -1px 0 rgba(255,255,255,0.08),
          inset 1px 0 0 rgba(255,255,255,0.15),
          inset -1px 0 0 rgba(255,255,255,0.15),
          0 24px 64px rgba(0,0,0,0.40)
        `,
        ...style
      }}
    >
      {children}
    </div>
  )
}