import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string({
    required_error: 'Campo obrigatório',
  }),
  email: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .email(),
  password: z.string({
    required_error: 'Campo obrigatório',
  }),
})

export type CreateUserType = z.infer<typeof createUserSchema>
export type CreateUserInput = z.input<typeof createUserSchema>
export type CreateUserOutput = z.output<typeof createUserSchema>
