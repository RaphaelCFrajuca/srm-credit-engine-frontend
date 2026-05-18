import type { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const AppLayout = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen bg-slate-100 text-slate-900">
    <Header />
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </div>
)
