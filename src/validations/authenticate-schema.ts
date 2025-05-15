import { z } from 'zod'

export const authenticateSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export type AuthenticateType = z.infer<typeof authenticateSchema>
export type AuthenticateInput = z.input<typeof authenticateSchema>
export type AuthenticateOutput = z.output<typeof authenticateSchema>
