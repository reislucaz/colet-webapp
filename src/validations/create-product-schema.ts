import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string({
    required_error: 'Campo obrigatório',
  }),
  description: z.string({
    required_error: 'Campo obrigatório',
  }),
  price: z.coerce.number().optional(),
  recurring: z.boolean().default(false),
  neighborhood: z.string({
    required_error: 'Campo obrigatório',
  }),
  city: z.string({
    required_error: 'Campo obrigatório',
  }),
  state: z.string({
    required_error: 'Campo obrigatório',
  }),
  category: z.string({
    required_error: 'Campo obrigatório',
  }),
})

export type CreateProductType = z.infer<typeof createProductSchema>
export type CreateProductInput = z.input<typeof createProductSchema>
export type CreateProductOutput = z.output<typeof createProductSchema>
