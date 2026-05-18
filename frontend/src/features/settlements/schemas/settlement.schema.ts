import { z } from 'zod'

const numericString = z.string().regex(/^\d+(\.\d+)?$/, 'Valor deve ser numérico e positivo')

export const receivableSchema = z
  .object({
    type: z.enum(['MERCANTILE_DUPLICATE', 'POSTDATED_CHECK']),
    faceValue: numericString,
    faceCurrencyId: z.string().uuid('Moeda de face obrigatória'),
    issueDate: z.string().min(1, 'Data de emissão obrigatória'),
    dueDate: z.string().min(1, 'Data de vencimento obrigatória'),
  })
  .refine((data) => new Date(data.dueDate) > new Date(data.issueDate), {
    message: 'Vencimento deve ser maior que emissão',
    path: ['dueDate'],
  })

export const settlementSchema = z.object({
  assignorId: z.string().uuid('Cedente obrigatório'),
  paymentCurrencyId: z.string().uuid('Moeda de pagamento obrigatória'),
  baseRate: numericString,
  idempotencyKey: z.string().min(1, 'idempotencyKey obrigatória'),
  receivables: z.array(receivableSchema).min(1, 'Lote deve ter pelo menos 1 recebível'),
})

export type SettlementSchema = z.infer<typeof settlementSchema>
