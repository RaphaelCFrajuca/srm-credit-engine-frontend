import { formatDateTime, formatDecimal } from '../../../lib/formatters'
import type { ExchangeRate } from '../../../types/api'
import { EmptyState } from '../../../components/ui/EmptyState'
import { Table } from '../../../components/ui/Table'

export const ExchangeRateHistory = ({ rates }: { rates?: ExchangeRate[] }) => {
  if (!rates?.length) {
    return <EmptyState text="Sem histórico no período informado." />
  }

  return (
    <Table>
      <thead className="bg-slate-100">
        <tr>
          <th className="px-3 py-2 text-left font-semibold">Rate</th>
          <th className="px-3 py-2 text-left font-semibold">Efetiva em</th>
          <th className="px-3 py-2 text-left font-semibold">Fonte</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {rates.map((rate) => (
          <tr key={rate.id}>
            <td className="px-3 py-2">{formatDecimal(rate.rate)}</td>
            <td className="px-3 py-2">{formatDateTime(rate.effectiveAt)}</td>
            <td className="px-3 py-2">{rate.source}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
