import { z } from 'zod'

export const editProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  images: z.array(z.string()).optional().default([]),
})

export type EditProductSchemaType = z.infer<typeof editProductSchema>
