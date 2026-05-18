export const Loading = ({ text = 'Carregando...' }: { text?: string }) => (
  <div className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">{text}</div>
)
