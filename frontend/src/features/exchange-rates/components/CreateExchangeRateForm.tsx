import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '../../../app/toast-context'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { getTraceIdFromError } from '../../../lib/api'
import { normalizeApiError } from '../../../lib/errors'
import type { Currency } from '../../../types/api'
import {
  createExchangeRateSchema,
  type CreateExchangeRateSchema,
} from '../schemas/exchange-rate.schema'
import { useCreateExchangeRate } from '../services/exchange-rate.service'

interface Props {
  currencies: Currency[]
  onCreated: () => Promise<unknown>
}

export const CreateExchangeRateForm = ({ currencies, onCreated }: Props) => {
  const { success, error: toastError } = useToast()
  const mutation = useCreateExchangeRate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExchangeRateSchema>({
    resolver: zodResolver(createExchangeRateSchema),
    defaultValues: { source: 'manual' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync({ ...values, effectiveAt: new Date(values.effectiveAt).toISOString() })
      success('Taxa de câmbio cadastrada com sucesso.')
      await onCreated()
    } catch (error) {
      const normalized = normalizeApiError(error)
      const traceId = normalized.traceId ?? getTraceIdFromError(error)
      toastError(
        `Erro ao criar taxa (${normalized.status ?? 'sem status'}): ${normalized.message}${traceId ? ` | Trace ID: ${traceId}` : ''}`,
      )
    }
  })

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold">Cadastrar Taxa de Câmbio</h2>
      <form className="grid gap-3 md:grid-cols-5" onSubmit={onSubmit}>
        <div>
          <label>Origem</label>
          <Select defaultValue="" {...register('fromCurrencyId')} error={errors.fromCurrencyId?.message}>
            <option value="">Selecione</option>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>{currency.code}</option>
            ))}
          </Select>
        </div>
        <div>
          <label>Destino</label>
          <Select defaultValue="" {...register('toCurrencyId')} error={errors.toCurrencyId?.message}>
            <option value="">Selecione</option>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>{currency.code}</option>
            ))}
          </Select>
        </div>
        <div>
          <label>Taxa</label>
          <Input placeholder="5.1234567890" {...register('rate')} error={errors.rate?.message} />
        </div>
        <div>
          <label>Efetiva em</label>
          <Input type="datetime-local" {...register('effectiveAt')} error={errors.effectiveAt?.message} />
        </div>
        <div>
          <label>Fonte</label>
          <Input {...register('source')} error={errors.source?.message} />
        </div>
        <div className="md:col-span-5">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : 'Cadastrar Taxa'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
