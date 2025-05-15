import {
  createUserSchema,
  CreateUserType,
} from '@/validations/create-user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormFieldsConstant } from '@/@types/form-field'

export function useRegisterFormField() {
  const form = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  type RegisterFormData = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }

  const REGISTER_FORM_FIELD: FormFieldsConstant<RegisterFormData> = [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      placeholder: 'Digite seu nome',
      className: 'col-span-full',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite seu email',
      className: 'col-span-full',
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
      className: 'col-span-full',
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Senha',
      type: 'password',
      placeholder: 'Confirme sua senha',
      className: 'col-span-full',
    },
  ]

  return {
    form,
    REGISTER_FORM_FIELD,
  }
}
