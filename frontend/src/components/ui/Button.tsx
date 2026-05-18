import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'default' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  default: 'bg-slate-900 text-white hover:bg-slate-700',
  secondary: 'bg-blue-600 text-white hover:bg-blue-500',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 border border-slate-300',
}

export const Button = ({ className, variant = 'default', ...props }: ButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
      variants[variant],
      className,
    )}
    {...props}
  />
)
