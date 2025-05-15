import { z } from 'zod'

export const createUserSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A confirmação de senha deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type CreateUserType = z.infer<typeof createUserSchema>
export type CreateUserInput = Omit<CreateUserType, 'confirmPassword'>
export type CreateUserOutput = z.output<typeof createUserSchema>
