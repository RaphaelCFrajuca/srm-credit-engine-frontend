import { z } from 'zod'

export const currencySchema = z.object({
  code: z.enum(['USD', 'EUR', 'GBP', 'JPY', 'BRL']),
  name: z.string().min(2, 'Nome obrigatório'),
  decimalPlaces: z.number().int().min(0).max(8),
})

export type CurrencySchema = z.input<typeof currencySchema>
