import { cn } from '../../lib/cn'

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  SETTLED: 'bg-emerald-100 text-emerald-700',
  FAILED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-slate-200 text-slate-700',
}

export const Badge = ({ label }: { label: string }) => (
  <span
    className={cn(
      'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
      statusColors[label] ?? 'bg-slate-100 text-slate-700',
    )}
  >
    {label}
  </span>
)
