import type { PropsWithChildren } from 'react'
import { cn } from '../../lib/cn'

export const Card = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <section className={cn('rounded-xl border border-slate-200 bg-white p-5 shadow-sm', className)}>{children}</section>
)
