import type { PropsWithChildren } from 'react'

export const Table = ({ children }: PropsWithChildren) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200">
    <table className="min-w-full divide-y divide-slate-200 text-sm">{children}</table>
  </div>
)
