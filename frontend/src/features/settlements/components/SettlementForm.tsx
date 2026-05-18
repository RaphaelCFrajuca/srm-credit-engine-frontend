import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useToast } from '../../../app/toast-context'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { getTraceIdFromError } from '../../../lib/api'
import { normalizeApiError } from '../../../lib/errors'
import type { Assignor, CreateSettlementResponse, Currency } from '../../../types/api'
import { ReceivableItemsForm } from './ReceivableItemsForm'
import { settlementSchema, type SettlementSchema } from '../schemas/settlement.schema'
import { useCreateSettlement } from '../services/settlement.service'

interface Props {
  assignors: Assignor[]
  currencies: Currency[]
  onSuccess: (response: CreateSettlementResponse) => void
}

export const SettlementForm = ({ assignors, currencies, onSuccess }: Props) => {
  const { success, error: toastError } = useToast()
  const mutation = useCreateSettlement()

  const form = useForm<SettlementSchema>({
    resolver: zodResolver(settlementSchema),
    defaultValues: {
      baseRate: '0.012',
      idempotencyKey: crypto.randomUUID(),
      receivables: [{
        type: 'MERCANTILE_DUPLICATE',
        faceValue: '10000.00',
        faceCurrencyId: '',
        issueDate: '',
        dueDate: '',
      }],
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await mutation.mutateAsync(values)
      onSuccess(response)
      success('Liquidação criada com sucesso.')
    } catch (error) {
      const normalized = normalizeApiError(error)
      const traceId = normalized.traceId ?? getTraceIdFromError(error)
      toastError(
        `Erro ao liquidar lote (${normalized.status ?? 'sem status'}): ${normalized.message}${traceId ? ` | Trace ID: ${traceId}` : ''}`,
      )
    }
  })

  const {
    register,
    formState: { errors },
  } = form

  return (
    <FormProvider {...form}>
      <Card className="space-y-4">
        <h2 className="text-lg font-semibold">Nova Liquidação</h2>
        <p className="text-sm text-slate-600">
          Se qualquer item falhar, a API faz rollback. A idempotencyKey evita duplicidade no processamento.
        </p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <label>Cedente</label>
              <Select defaultValue="" {...register('assignorId')} error={errors.assignorId?.message}>
                <option value="">Selecione</option>
                {assignors.map((assignor) => (
                  <option key={assignor.id} value={assignor.id}>{assignor.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label>Moeda de pagamento</label>
              <Select defaultValue="" {...register('paymentCurrencyId')} error={errors.paymentCurrencyId?.message}>
                <option value="">Selecione</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>{currency.code}</option>
                ))}
              </Select>
            </div>
            <div>
              <label>Taxa base</label>
              <Input {...register('baseRate')} error={errors.baseRate?.message} />
            </div>
            <div>
              <label>Idempotency Key</label>
              <Input {...register('idempotencyKey')} error={errors.idempotencyKey?.message} />
            </div>
          </div>

          <ReceivableItemsForm currencies={currencies} />

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Enviando...' : 'Criar Liquidação'}
          </Button>
        </form>
      </Card>
    </FormProvider>
  )
}
