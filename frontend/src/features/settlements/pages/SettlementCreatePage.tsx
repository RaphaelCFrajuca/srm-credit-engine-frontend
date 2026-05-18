import { useState } from 'react'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Loading } from '../../../components/ui/Loading'
import type { CreateSettlementResponse } from '../../../types/api'
import { useAssignors } from '../../assignors/services/assignor.service'
import { useCurrencies } from '../../currencies/services/currency.service'
import { SettlementForm } from '../components/SettlementForm'
import { SettlementResult } from '../components/SettlementResult'

export const SettlementCreatePage = () => {
  const [result, setResult] = useState<CreateSettlementResponse>()
  const assignors = useAssignors()
  const currencies = useCurrencies()

  if (assignors.isPending || currencies.isPending) return <Loading text="Carregando dados auxiliares..." />
  if (assignors.isError) return <ErrorState text={(assignors.error as Error).message} onRetry={() => void assignors.refetch()} />
  if (currencies.isError) return <ErrorState text={(currencies.error as Error).message} onRetry={() => void currencies.refetch()} />

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Nova Liquidação</h2>
      <SettlementForm assignors={assignors.data} currencies={currencies.data} onSuccess={setResult} />
      <SettlementResult result={result} />
    </div>
  )
}
