import { z } from 'zod'

export const createExchangeRateSchema = z
  .object({
    fromCurrencyId: z.string().uuid('Moeda origem obrigatória'),
    toCurrencyId: z.string().uuid('Moeda destino obrigatória'),
    rate: z.string().regex(/^\d+(\.\d+)?$/, 'Taxa deve ser numérica e positiva'),
    effectiveAt: z.string().min(1, 'Data efetiva obrigatória'),
    source: z.string().min(2, 'Fonte obrigatória'),
  })
  .refine((data) => data.fromCurrencyId !== data.toCurrencyId, {
    message: 'Moeda origem e destino não podem ser iguais',
    path: ['toCurrencyId'],
  })

export const exchangeRateFilterSchema = z.object({
  fromCurrencyId: z.string().uuid().optional().or(z.literal('')),
  toCurrencyId: z.string().uuid().optional().or(z.literal('')),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export type CreateExchangeRateSchema = z.infer<typeof createExchangeRateSchema>
export type ExchangeRateFilterSchema = z.infer<typeof exchangeRateFilterSchema>
