import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import type { Currency } from '../../../types/api'
import type { SettlementSchema } from '../schemas/settlement.schema'

export const ReceivableItemsForm = ({ currencies }: { currencies: Currency[] }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<SettlementSchema>()
  const { fields, append, remove } = useFieldArray({ control, name: 'receivables' })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recebíveis</h3>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              type: 'MERCANTILE_DUPLICATE',
              faceValue: '0',
              faceCurrencyId: '',
              issueDate: '',
              dueDate: '',
            })
          }
        >
          Adicionar recebível
        </Button>
      </div>

      {errors.receivables?.message ? <p className="text-xs text-red-600">{errors.receivables.message}</p> : null}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-3 rounded-md border border-slate-200 p-4 md:grid-cols-5">
            <div>
              <label>Tipo</label>
              <Select {...register(`receivables.${index}.type`)}>
                <option value="MERCANTILE_DUPLICATE">MERCANTILE_DUPLICATE</option>
                <option value="POSTDATED_CHECK">POSTDATED_CHECK</option>
              </Select>
            </div>
            <div>
              <label>Valor face</label>
              <Input {...register(`receivables.${index}.faceValue`)} error={errors.receivables?.[index]?.faceValue?.message} />
            </div>
            <div>
              <label>Moeda face</label>
              <Select defaultValue="" {...register(`receivables.${index}.faceCurrencyId`)} error={errors.receivables?.[index]?.faceCurrencyId?.message}>
                <option value="">Selecione</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>{currency.code}</option>
                ))}
              </Select>
            </div>
            <div>
              <label>Emissão</label>
              <Input type="date" {...register(`receivables.${index}.issueDate`)} error={errors.receivables?.[index]?.issueDate?.message} />
            </div>
            <div>
              <label>Vencimento</label>
              <Input type="date" {...register(`receivables.${index}.dueDate`)} error={errors.receivables?.[index]?.dueDate?.message} />
            </div>
            <div className="md:col-span-5">
              <Button type="button" variant="danger" onClick={() => remove(index)}>
                Remover item
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
