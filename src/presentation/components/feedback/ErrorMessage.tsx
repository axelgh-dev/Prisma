import clsx from 'clsx'

interface ErrorMessageProps {
  message: string | null
  className?: string
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null

  return (
    <div
      className={clsx(
        'flex items-center gap-2 px-4 py-3 rounded-xl text-sm',
        'bg-red-500/15 border border-red-400/30 text-red-300',
        className
      )}
    >
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </div>
  )
}