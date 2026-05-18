import { EmptyState } from '../../../components/ui/EmptyState'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Loading } from '../../../components/ui/Loading'
import { Table } from '../../../components/ui/Table'
import { useAssignors } from '../services/assignor.service'

export const AssignorList = () => {
  const { data, isPending, isError, error, refetch } = useAssignors()

  if (isPending) return <Loading text="Carregando cedentes..." />
  if (isError) return <ErrorState text={(error as Error).message} onRetry={() => void refetch()} />
  if (!data?.length) return <EmptyState text="Nenhum cedente cadastrado." />

  return (
    <Table>
      <thead className="bg-slate-100">
        <tr>
          <th className="px-3 py-2 text-left font-semibold">Documento</th>
          <th className="px-3 py-2 text-left font-semibold">Nome</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {data.map((assignor) => (
          <tr key={assignor.id}>
            <td className="px-3 py-2">{assignor.document}</td>
            <td className="px-3 py-2">{assignor.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
