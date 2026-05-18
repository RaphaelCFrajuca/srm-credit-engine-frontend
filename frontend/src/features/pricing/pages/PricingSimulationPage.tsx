import { useState } from 'react'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Loading } from '../../../components/ui/Loading'
import type { PricingSimulationResponse } from '../../../types/api'
import { useCurrencies } from '../../currencies/services/currency.service'
import { PricingSimulationForm } from '../components/PricingSimulationForm'
import { PricingSimulationResult } from '../components/PricingSimulationResult'

export const PricingSimulationPage = () => {
  const [result, setResult] = useState<PricingSimulationResponse>()
  const currencies = useCurrencies()

  if (currencies.isPending) return <Loading text="Carregando moedas..." />
  if (currencies.isError) {
    return <ErrorState text={(currencies.error as Error).message} onRetry={() => void currencies.refetch()} />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Simulação de Pricing</h2>
      <PricingSimulationForm currencies={currencies.data} onSuccess={(data) => setResult(data)} />
      <PricingSimulationResult result={result} />
    </div>
  )
}
