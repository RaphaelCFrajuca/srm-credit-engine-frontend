import { z } from 'zod'

export const settlementExtractSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  assignorId: z.string().optional(),
  currencyId: z.string().optional(),
  faceCurrencyId: z.string().optional(),
  paymentCurrencyId: z.string().optional(),
  receivableType: z.enum(['MERCANTILE_DUPLICATE', 'POSTDATED_CHECK']).optional().or(z.literal('')),
  status: z.enum(['PENDING', 'SETTLED', 'FAILED', 'CANCELLED']).optional().or(z.literal('')),
  pageSize: z.number().int().min(1).max(100).default(10),
})

export type SettlementExtractSchema = z.input<typeof settlementExtractSchema>
