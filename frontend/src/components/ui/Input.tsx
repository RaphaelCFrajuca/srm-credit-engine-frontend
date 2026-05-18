import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = ({ className, error, ...props }: InputProps) => (
  <div className="space-y-1">
    <input
      className={cn(
        'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
        className,
      )}
      {...props}
    />
    {error ? <p className="text-xs text-red-600">{error}</p> : null}
  </div>
)
