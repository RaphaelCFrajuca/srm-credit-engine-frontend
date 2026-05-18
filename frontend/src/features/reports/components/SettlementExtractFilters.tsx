import type { UseFormReturn } from 'react-hook-form'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import type { Assignor, Currency } from '../../../types/api'
import type { SettlementExtractSchema } from '../schemas/settlement-extract.schema'

interface Props {
  form: UseFormReturn<SettlementExtractSchema>
  assignors: Assignor[]
  currencies: Currency[]
  onSearch: () => void
  onClear: () => void
}

export const SettlementExtractFilters = ({ form, assignors, currencies, onSearch, onClear }: Props) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <div>
        <label>From</label>
        <Input type="date" {...register('from')} error={errors.from?.message} />
      </div>
      <div>
        <label>To</label>
        <Input type="date" {...register('to')} error={errors.to?.message} />
      </div>
      <div>
        <label>Cedente</label>
        <Select {...register('assignorId')}>
          <option value="">Todos</option>
          {assignors.map((assignor) => (
            <option key={assignor.id} value={assignor.id}>{assignor.name}</option>
          ))}
        </Select>
      </div>
      <div>
        <label>Currency Id</label>
        <Select {...register('currencyId')}>
          <option value="">Todas</option>
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>{currency.code}</option>
          ))}
        </Select>
      </div>
      <div>
        <label>Face Currency</label>
        <Select {...register('faceCurrencyId')}>
          <option value="">Todas</option>
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>{currency.code}</option>
          ))}
        </Select>
      </div>
      <div>
        <label>Payment Currency</label>
        <Select {...register('paymentCurrencyId')}>
          <option value="">Todas</option>
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>{currency.code}</option>
          ))}
        </Select>
      </div>
      <div>
        <label>Tipo</label>
        <Select {...register('receivableType')}>
          <option value="">Todos</option>
          <option value="MERCANTILE_DUPLICATE">MERCANTILE_DUPLICATE</option>
          <option value="POSTDATED_CHECK">POSTDATED_CHECK</option>
        </Select>
      </div>
      <div>
        <label>Status</label>
        <Select {...register('status')}>
          <option value="">Todos</option>
          <option value="PENDING">PENDING</option>
          <option value="SETTLED">SETTLED</option>
          <option value="FAILED">FAILED</option>
          <option value="CANCELLED">CANCELLED</option>
        </Select>
      </div>
      <div>
        <label>Page Size</label>
        <Input
          type="number"
          {...register('pageSize', { valueAsNumber: true })}
          error={errors.pageSize?.message}
        />
      </div>
      <div className="flex items-end gap-2 md:col-span-2">
        <Button type="button" onClick={onSearch}>Buscar</Button>
        <Button type="button" variant="ghost" onClick={onClear}>Limpar filtros</Button>
      </div>
    </div>
  )
}
