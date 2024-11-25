import { FormFieldsConstant } from '@/@types/form-field'
import {
  CreateUserInput,
  CreateUserType,
  createUserSchema,
} from '@/validations/create-user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function useRegisterFormField() {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  })

  const REGISTER_FORM_FIELD: FormFieldsConstant<CreateUserType> = [
    [
      {
        name: 'name',
        label: 'Nome',
        className: 'col-span-full',
        placeholder: 'Ex: Gustavo Bertonsin',
        type: 'text',
      },
    ],
    [
      {
        name: 'email',
        label: 'Email',
        className: 'col-span-full',
        placeholder: 'Ex: johndoe@example.com',
        type: 'text',
      },
    ],
    [
      {
        name: 'password',
        label: 'Senha',
        className: 'col-span-full',
        placeholder: 'Ex: **********',
        type: 'password',
      },
    ],
  ]

  return {
    form,
    REGISTER_FORM_FIELD,
  }
}
