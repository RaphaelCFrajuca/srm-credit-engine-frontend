import { Card } from '../../../components/ui/Card'
import { formatDateTime, formatDecimal } from '../../../lib/formatters'
import type { ExchangeRate } from '../../../types/api'

export const LatestExchangeRateCard = ({ rate }: { rate?: ExchangeRate }) => (
  <Card className="space-y-1">
    <h2 className="text-lg font-semibold">Última Taxa</h2>
    {rate ? (
      <>
        <p className="text-sm text-slate-700">Rate: {formatDecimal(rate.rate)}</p>
        <p className="text-sm text-slate-700">Efetiva em: {formatDateTime(rate.effectiveAt)}</p>
        <p className="text-sm text-slate-700">Fonte: {rate.source}</p>
      </>
    ) : (
      <p className="text-sm text-slate-500">Selecione um par de moedas para consultar.</p>
    )}
  </Card>
)
