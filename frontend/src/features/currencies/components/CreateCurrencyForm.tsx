import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '../../../app/toast-context'
import { getTraceIdFromError } from '../../../lib/api'
import { normalizeApiError } from '../../../lib/errors'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { currencySchema, type CurrencySchema } from '../schemas/currency.schema'
import { useCreateCurrency } from '../services/currency.service'

export const CreateCurrencyForm = () => {
  const { success, error: toastError } = useToast()
  const mutation = useCreateCurrency()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CurrencySchema>({
    resolver: zodResolver(currencySchema),
    defaultValues: { code: 'BRL', decimalPlaces: 2, name: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values)
      success('Moeda criada com sucesso.')
      reset({ code: values.code, decimalPlaces: values.decimalPlaces, name: '' })
    } catch (error) {
      const normalized = normalizeApiError(error)
      const traceId = normalized.traceId ?? getTraceIdFromError(error)
      toastError(
        `Erro ao criar moeda (${normalized.status ?? 'sem status'}): ${normalized.message}${traceId ? ` | Trace ID: ${traceId}` : ''}`,
      )
    }
  })

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold">Cadastrar Moeda</h2>
      <form className="grid gap-3 md:grid-cols-3" onSubmit={onSubmit}>
        <div>
          <label>Código</label>
          <Select {...register('code')} error={errors.code?.message}>
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </Select>
        </div>
        <div>
          <label>Nome</label>
          <Input placeholder="Real Brasileiro" {...register('name')} error={errors.name?.message} />
        </div>
        <div>
          <label>Casas Decimais</label>
          <Input
            type="number"
            {...register('decimalPlaces', { valueAsNumber: true })}
            error={errors.decimalPlaces?.message}
          />
        </div>
        <div className="md:col-span-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : 'Criar Moeda'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
