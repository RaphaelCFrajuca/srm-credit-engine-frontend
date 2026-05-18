import { Badge } from '../../../components/ui/Badge'
import { EmptyState } from '../../../components/ui/EmptyState'
import { Table } from '../../../components/ui/Table'
import { formatCurrencyValue, formatDateTime, formatDecimal } from '../../../lib/formatters'
import type { SettlementExtractItem } from '../../../types/api'

export const SettlementExtractTable = ({ items }: { items: SettlementExtractItem[] }) => {
  if (!items.length) return <EmptyState text="Nenhum lançamento encontrado." />

  return (
    <Table>
      <thead className="bg-slate-100">
        <tr>
          <th className="px-3 py-2 text-left">batchId</th>
          <th className="px-3 py-2 text-left">receivableId</th>
          <th className="px-3 py-2 text-left">Criação</th>
          <th className="px-3 py-2 text-left">Cedente</th>
          <th className="px-3 py-2 text-left">Documento</th>
          <th className="px-3 py-2 text-left">Tipo</th>
          <th className="px-3 py-2 text-left">Status batch</th>
          <th className="px-3 py-2 text-left">Status recebível</th>
          <th className="px-3 py-2 text-left">Valor face</th>
          <th className="px-3 py-2 text-left">Valor presente</th>
          <th className="px-3 py-2 text-left">Valor convertido</th>
          <th className="px-3 py-2 text-left">Moeda face</th>
          <th className="px-3 py-2 text-left">Moeda pagamento</th>
          <th className="px-3 py-2 text-left">Taxa câmbio</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {items.map((item) => (
          <tr key={`${item.batchId}-${item.receivableId}`}>
            <td className="px-3 py-2">{item.batchId}</td>
            <td className="px-3 py-2">{item.receivableId}</td>
            <td className="px-3 py-2">{formatDateTime(item.createdAt)}</td>
            <td className="px-3 py-2">{item.assignorName}</td>
            <td className="px-3 py-2">{item.assignorDocument}</td>
            <td className="px-3 py-2">{item.receivableType}</td>
            <td className="px-3 py-2"><Badge label={item.batchStatus} /></td>
            <td className="px-3 py-2"><Badge label={item.receivableStatus} /></td>
            <td className="px-3 py-2">{formatCurrencyValue(item.faceValue, item.faceCurrencyCode)}</td>
            <td className="px-3 py-2">{formatCurrencyValue(item.presentValue, item.faceCurrencyCode)}</td>
            <td className="px-3 py-2">{formatCurrencyValue(item.convertedPresentValue, item.paymentCurrencyCode)}</td>
            <td className="px-3 py-2">{item.faceCurrencyCode}</td>
            <td className="px-3 py-2">{item.paymentCurrencyCode}</td>
            <td className="px-3 py-2">{item.exchangeRate ? formatDecimal(item.exchangeRate) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
