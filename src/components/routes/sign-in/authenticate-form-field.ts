import { FormFieldsConstant } from '@/@types/form-field'
import { AuthenticateType } from '@/validations/authenticate-schema'

export function useAuthenticateFormField() {
  const AUTHENTICATE_FORM_FIELD: FormFieldsConstant<AuthenticateType> = [
    [
      {
        name: 'email',
        label: 'Digite o seu email',
        className: 'col-span-full',
        placeholder: 'Ex: johndoe@example.com',
        type: 'text',
      },
    ],
    [
      {
        name: 'password',
        label: 'Digite a sua senha',
        className: 'col-span-full',
        placeholder: 'Ex: **********',
        type: 'password',
      },
    ],
  ]

  return {
    AUTHENTICATE_FORM_FIELD,
  }
}
