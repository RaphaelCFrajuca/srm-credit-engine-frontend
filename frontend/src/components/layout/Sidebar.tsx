import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/currencies', label: 'Moedas' },
  { to: '/exchange-rates', label: 'Taxas de Câmbio' },
  { to: '/assignors', label: 'Cedentes' },
  { to: '/pricing/simulate', label: 'Simulação' },
  { to: '/settlements/new', label: 'Nova Liquidação' },
  { to: '/settlements/extract', label: 'Extrato' },
]

export const Sidebar = () => (
  <aside className="w-full border-b border-slate-200 bg-white p-4 lg:w-64 lg:border-b-0 lg:border-r">
    <nav className="grid gap-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-2 text-sm font-medium transition',
              isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100',
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
)
