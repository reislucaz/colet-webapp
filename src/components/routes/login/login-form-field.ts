import { FormFieldsConstant } from '@/@types/form-field'

type LoginFormData = {
  email: string
  password: string
}

export const LOGIN_FORM_FIELD: FormFieldsConstant<LoginFormData> = [
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
]
