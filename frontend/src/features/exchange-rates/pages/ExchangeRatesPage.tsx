import { useState } from 'react'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Input } from '../../../components/ui/Input'
import { Loading } from '../../../components/ui/Loading'
import { Select } from '../../../components/ui/Select'
import { useCurrencies } from '../../currencies/services/currency.service'
import { CreateExchangeRateForm } from '../components/CreateExchangeRateForm'
import { ExchangeRateHistory } from '../components/ExchangeRateHistory'
import { LatestExchangeRateCard } from '../components/LatestExchangeRateCard'
import { useExchangeRateHistory, useLatestExchangeRate } from '../services/exchange-rate.service'

export const ExchangeRatesPage = () => {
  const [fromCurrencyId, setFromCurrencyId] = useState<string>('')
  const [toCurrencyId, setToCurrencyId] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const currencies = useCurrencies()
  const history = useExchangeRateHistory({ fromCurrencyId, toCurrencyId, startDate, endDate })
  const latest = useLatestExchangeRate(fromCurrencyId, toCurrencyId)

  if (currencies.isPending) return <Loading text="Carregando moedas..." />
  if (currencies.isError) {
    return <ErrorState text={(currencies.error as Error).message} onRetry={() => void currencies.refetch()} />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Taxas de Câmbio</h2>

      <CreateExchangeRateForm
        currencies={currencies.data}
        onCreated={async () => {
          await history.refetch()
          await latest.refetch()
        }}
      />

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-4">
        <div>
          <label>Moeda origem</label>
          <Select value={fromCurrencyId} onChange={(event) => setFromCurrencyId(event.target.value)}>
            <option value="">Selecione</option>
            {currencies.data.map((currency) => (
              <option key={currency.id} value={currency.id}>{currency.code}</option>
            ))}
          </Select>
        </div>
        <div>
          <label>Moeda destino</label>
          <Select value={toCurrencyId} onChange={(event) => setToCurrencyId(event.target.value)}>
            <option value="">Selecione</option>
            {currencies.data.map((currency) => (
              <option key={currency.id} value={currency.id}>{currency.code}</option>
            ))}
          </Select>
        </div>
        <div>
          <label>Início</label>
          <Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </div>
        <div>
          <label>Fim</label>
          <Input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </div>
      </div>

      {history.isError ? <ErrorState text={(history.error as Error).message} onRetry={() => void history.refetch()} /> : null}
      {history.isPending ? <Loading text="Carregando histórico..." /> : <ExchangeRateHistory rates={history.data} />}
      <LatestExchangeRateCard rate={latest.data} />
    </div>
  )
}
