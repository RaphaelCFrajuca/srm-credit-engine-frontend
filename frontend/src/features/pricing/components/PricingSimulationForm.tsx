import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '../../../app/toast-context'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { getTraceIdFromError } from '../../../lib/api'
import { normalizeApiError } from '../../../lib/errors'
import type { Currency, PricingSimulationResponse } from '../../../types/api'
import { pricingSchema, type PricingSchema } from '../schemas/pricing.schema'
import { useSimulatePricing } from '../services/pricing.service'

interface Props {
  currencies: Currency[]
  onSuccess: (result: PricingSimulationResponse) => void
}

export const PricingSimulationForm = ({ currencies, onSuccess }: Props) => {
  const { success, error: toastError } = useToast()
  const mutation = useSimulatePricing()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PricingSchema>({
    resolver: zodResolver(pricingSchema),
    defaultValues: { receivableType: 'MERCANTILE_DUPLICATE' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await mutation.mutateAsync(values)
      onSuccess(result)
      success('Simulação executada com sucesso.')
    } catch (error) {
      const normalized = normalizeApiError(error)
      const traceId = normalized.traceId ?? getTraceIdFromError(error)
      toastError(
        `Erro na simulação (${normalized.status ?? 'sem status'}): ${normalized.message}${traceId ? ` | Trace ID: ${traceId}` : ''}`,
      )
    }
  })

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold">Dados da Simulação</h2>
      <form className="grid gap-3 md:grid-cols-4" onSubmit={onSubmit}>
        <div>
          <label>Tipo</label>
          <Select {...register('receivableType')} error={errors.receivableType?.message}>
            <option value="MERCANTILE_DUPLICATE">MERCANTILE_DUPLICATE</option>
            <option value="POSTDATED_CHECK">POSTDATED_CHECK</option>
          </Select>
        </div>
        <div>
          <label>Valor de face</label>
          <Input {...register('faceValue')} placeholder="10000.00" error={errors.faceValue?.message} />
        </div>
        <div>
          <label>Taxa base</label>
          <Input {...register('baseRate')} placeholder="0.012" error={errors.baseRate?.message} />
        </div>
        <div>
          <label>Emissão</label>
          <Input type="date" {...register('issueDate')} error={errors.issueDate?.message} />
        </div>
        <div>
          <label>Vencimento</label>
          <Input type="date" {...register('dueDate')} error={errors.dueDate?.message} />
        </div>
        <div>
          <label>Moeda face</label>
          <Select defaultValue="" {...register('faceCurrencyId')} error={errors.faceCurrencyId?.message}>
            <option value="">Selecione</option>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>{currency.code}</option>
            ))}
          </Select>
        </div>
        <div>
          <label>Moeda pagamento</label>
          <Select defaultValue="" {...register('paymentCurrencyId')} error={errors.paymentCurrencyId?.message}>
            <option value="">Selecione</option>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>{currency.code}</option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Simulando...' : 'Simular Pricing'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
