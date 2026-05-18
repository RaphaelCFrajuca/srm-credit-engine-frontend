import { EmptyState } from '../../../components/ui/EmptyState'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Loading } from '../../../components/ui/Loading'
import { Table } from '../../../components/ui/Table'
import { useCurrencies } from '../services/currency.service'

export const CurrencyList = () => {
  const { data, isPending, isError, refetch, error } = useCurrencies()

  if (isPending) return <Loading text="Carregando moedas..." />
  if (isError) return <ErrorState text={(error as Error).message} onRetry={() => void refetch()} />
  if (!data?.length) return <EmptyState text="Nenhuma moeda cadastrada." />

  return (
    <Table>
      <thead className="bg-slate-100">
        <tr>
          <th className="px-3 py-2 text-left font-semibold">Código</th>
          <th className="px-3 py-2 text-left font-semibold">Nome</th>
          <th className="px-3 py-2 text-left font-semibold">Casas decimais</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {data.map((currency) => (
          <tr key={currency.id}>
            <td className="px-3 py-2">{currency.code}</td>
            <td className="px-3 py-2">{currency.name}</td>
            <td className="px-3 py-2">{currency.decimalPlaces}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
