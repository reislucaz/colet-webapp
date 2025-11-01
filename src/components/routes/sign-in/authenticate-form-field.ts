export function useAuthenticateFormField() {
  const authenticateFormField = [
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
    authenticateFormField,
  }
}
