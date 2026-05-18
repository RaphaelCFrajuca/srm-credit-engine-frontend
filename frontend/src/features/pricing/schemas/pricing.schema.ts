import { z } from 'zod'

const numericString = z.string().regex(/^\d+(\.\d+)?$/, 'Valor deve ser numérico e positivo')

export const pricingSchema = z
  .object({
    receivableType: z.enum(['MERCANTILE_DUPLICATE', 'POSTDATED_CHECK']),
    faceValue: numericString,
    baseRate: numericString,
    issueDate: z.string().min(1, 'Data de emissão obrigatória'),
    dueDate: z.string().min(1, 'Data de vencimento obrigatória'),
    faceCurrencyId: z.string().uuid('Moeda de face obrigatória'),
    paymentCurrencyId: z.string().uuid('Moeda de pagamento obrigatória'),
  })
  .refine((data) => new Date(data.dueDate) > new Date(data.issueDate), {
    message: 'Data de vencimento deve ser maior que emissão',
    path: ['dueDate'],
  })

export type PricingSchema = z.infer<typeof pricingSchema>
