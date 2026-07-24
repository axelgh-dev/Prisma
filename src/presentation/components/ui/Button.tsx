import { type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-12 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
  }

  const variants = {
    primary: clsx(
      'bg-white/30 backdrop-blur-xl',
      'border border-white/20 rounded-xl text-white font-semibold',
      'shadow-lg shadow-black/20',
      'hover:bg-black/60 hover:-translate-y-0.5',
      'active:translate-y-0',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      'transition-all duration-200'
    ),
    ghost: clsx(
      'bg-white/8 border border-white/18 rounded-xl text-white/80',
      'hover:bg-white/14 hover:text-white',
      'transition-all duration-200'
    ),
    danger: clsx(
      'bg-red-500/20 border border-red-400/40 rounded-xl text-red-300',
      'hover:bg-red-500/30',
      'transition-all duration-200'
    ),
  }

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 cursor-pointer select-none',
        sizes[size],
        variants[variant],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  )
}