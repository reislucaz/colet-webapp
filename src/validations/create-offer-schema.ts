import { z } from 'zod'

export const createOfferSchema = z.object({
  amount: z.coerce.number({
    required_error: 'Campo obrigatório',
  })
})

export type CreateOfferType = z.infer<typeof createOfferSchema>
