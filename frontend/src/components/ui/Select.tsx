import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

export const Select = ({ className, children, error, ...props }: SelectProps) => (
  <div className="space-y-1">
    <select
      className={cn(
        'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
        className,
      )}
      {...props}
    >
      {children}
    </select>
    {error ? <p className="text-xs text-red-600">{error}</p> : null}
  </div>
)
