import { z } from 'zod'

export const assignorSchema = z.object({
  document: z
    .string()
    .regex(/^\d+$/, 'Documento deve conter apenas números')
    .min(11, 'Documento deve ter ao menos 11 dígitos')
    .max(14, 'Documento deve ter no máximo 14 dígitos'),
  name: z.string().min(3, 'Nome obrigatório'),
})

export type AssignorSchema = z.infer<typeof assignorSchema>
