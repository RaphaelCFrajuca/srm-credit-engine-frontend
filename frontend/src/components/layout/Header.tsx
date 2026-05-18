import { env } from '../../config/env'

export const Header = () => (
  <header className="flex flex-col gap-2 border-b border-slate-200 bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="text-xl font-semibold text-slate-900">SRM Credit Engine</h1>
      <p className="text-xs text-slate-500">Ambiente: Local</p>
    </div>
    <p className="text-xs text-slate-500">API: {env.apiBaseUrl}</p>
  </header>
)
