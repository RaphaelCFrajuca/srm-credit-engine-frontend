import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '../../../app/toast-context'
import { getTraceIdFromError } from '../../../lib/api'
import { normalizeApiError } from '../../../lib/errors'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { assignorSchema, type AssignorSchema } from '../schemas/assignor.schema'
import { useCreateAssignor } from '../services/assignor.service'

export const CreateAssignorForm = () => {
  const { success, error: toastError } = useToast()
  const mutation = useCreateAssignor()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignorSchema>({ resolver: zodResolver(assignorSchema) })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values)
      success('Cedente criado com sucesso.')
      reset({ document: '', name: '' })
    } catch (error) {
      const normalized = normalizeApiError(error)
      const traceId = normalized.traceId ?? getTraceIdFromError(error)
      toastError(
        `Erro ao criar cedente (${normalized.status ?? 'sem status'}): ${normalized.message}${traceId ? ` | Trace ID: ${traceId}` : ''}`,
      )
    }
  })

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold">Cadastrar Cedente</h2>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <label>Documento</label>
          <Input placeholder="12345678000199" {...register('document')} error={errors.document?.message} />
        </div>
        <div>
          <label>Nome</label>
          <Input placeholder="Empresa Cedente XPTO LTDA" {...register('name')} error={errors.name?.message} />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : 'Criar Cedente'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
