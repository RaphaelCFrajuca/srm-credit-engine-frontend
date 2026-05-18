import { Button } from '../../../components/ui/Button'

interface Props {
  page: number
  totalPages: number
  totalItems: number
  onPrevious: () => void
  onNext: () => void
}

export const SettlementExtractPagination = ({
  page,
  totalPages,
  totalItems,
  onPrevious,
  onNext,
}: Props) => (
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm">
    <p>
      Página {page} de {Math.max(totalPages, 1)} | Total de registros: {totalItems}
    </p>
    <div className="flex gap-2">
      <Button variant="ghost" onClick={onPrevious} disabled={page <= 1}>
        Página anterior
      </Button>
      <Button onClick={onNext} disabled={page >= totalPages && totalPages > 0}>
        Próxima página
      </Button>
    </div>
  </div>
)
