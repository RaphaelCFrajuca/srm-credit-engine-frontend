import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { Table } from '../../../components/ui/Table'
import { formatCurrencyValue } from '../../../lib/formatters'
import type { CreateSettlementResponse } from '../../../types/api'

export const SettlementResult = ({ result }: { result?: CreateSettlementResponse }) => {
  if (!result) {
    return (
      <Card>
        <p className="text-sm text-slate-500">Envie uma liquidação para visualizar o resultado.</p>
      </Card>
    )
  }

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <p>Batch ID: {result.batchId}</p>
        <Badge label={result.status} />
      </div>
      <Table>
        <thead className="bg-slate-100">
          <tr>
            <th className="px-3 py-2 text-left">Receivable ID</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Face</th>
            <th className="px-3 py-2 text-left">Presente</th>
            <th className="px-3 py-2 text-left">Convertido</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {result.receivables.map((receivable) => (
            <tr key={receivable.receivableId}>
              <td className="px-3 py-2">{receivable.receivableId}</td>
              <td className="px-3 py-2"><Badge label={receivable.status} /></td>
              <td className="px-3 py-2">{formatCurrencyValue(receivable.faceValue)}</td>
              <td className="px-3 py-2">{formatCurrencyValue(receivable.presentValue)}</td>
              <td className="px-3 py-2">{formatCurrencyValue(receivable.convertedPresentValue)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
