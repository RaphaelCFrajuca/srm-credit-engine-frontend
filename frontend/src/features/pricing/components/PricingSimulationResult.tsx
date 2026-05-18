import { Card } from '../../../components/ui/Card'
import { formatCurrencyValue, formatDecimal, formatPercentDecimal } from '../../../lib/formatters'
import type { PricingSimulationResponse } from '../../../types/api'

export const PricingSimulationResult = ({ result }: { result?: PricingSimulationResponse }) => {
  if (!result) {
    return (
      <Card>
        <p className="text-sm text-slate-500">Faça uma simulação para visualizar os resultados.</p>
      </Card>
    )
  }

  return (
    <Card className="grid gap-2 md:grid-cols-2">
      <p>Valor face: {formatCurrencyValue(result.faceValue)}</p>
      <p>Valor presente: {formatCurrencyValue(result.presentValue)}</p>
      <p>Valor convertido: {formatCurrencyValue(result.convertedPresentValue)}</p>
      <p>Taxa base: {formatPercentDecimal(result.baseRate)}</p>
      <p>Spread: {formatPercentDecimal(result.spread)}</p>
      <p>Taxa total: {formatPercentDecimal(result.totalRate)}</p>
      <p>Prazo em dias: {result.termDays}</p>
      <p>Prazo em meses: {result.termMonths}</p>
      <p>Taxa de câmbio usada: {result.exchangeRate ? formatDecimal(result.exchangeRate) : '-'}</p>
      <p>ExchangeRate ID: {result.exchangeRateId ?? '-'}</p>
    </Card>
  )
}
