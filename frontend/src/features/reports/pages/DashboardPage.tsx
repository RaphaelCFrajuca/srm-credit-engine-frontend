import { Link } from 'react-router-dom'
import { Card } from '../../../components/ui/Card'
import { Loading } from '../../../components/ui/Loading'
import { useAssignors } from '../../assignors/services/assignor.service'
import { useCurrencies } from '../../currencies/services/currency.service'
import { useSettlementExtract } from '../services/settlement-extract.service'

const QuickLink = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
    {label}
  </Link>
)

export const DashboardPage = () => {
  const currencies = useCurrencies()
  const assignors = useAssignors()
  const settlementExtract = useSettlementExtract({ page: 1, pageSize: 1 })

  if (currencies.isPending || assignors.isPending || settlementExtract.isPending) {
    return <Loading text="Carregando dashboard..." />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Total de moedas</p>
          <p className="text-2xl font-semibold">{currencies.data?.length ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Total de cedentes</p>
          <p className="text-2xl font-semibold">{assignors.data?.length ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Registros de extrato</p>
          <p className="text-2xl font-semibold">{settlementExtract.data?.totalItems ?? 0}</p>
        </Card>
      </div>
      <Card className="flex flex-wrap gap-2">
        <QuickLink to="/pricing/simulate" label="Ir para simulação" />
        <QuickLink to="/settlements/new" label="Ir para liquidação" />
        <QuickLink to="/settlements/extract" label="Ir para extrato" />
      </Card>
    </div>
  )
}
