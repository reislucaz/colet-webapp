import { z } from 'zod'

export const createOfferSchema = z.object({
  amount: z.preprocess((val) => {
    return val ? Number((val as string).replace('.', '').replace(',', '.')) : 0
  }, z.coerce.number().positive('O valor da oferta deve ser maior que zero.')),
})

export type CreateOfferType = z.infer<typeof createOfferSchema>
