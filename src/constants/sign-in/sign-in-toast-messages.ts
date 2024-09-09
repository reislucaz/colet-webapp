import { ErrorMessagesProps } from '@/@types/toast-messages'

interface SignInErrorMessagesProps {
  invalidCredentials: ErrorMessagesProps
}

export const signinErrorMessages: SignInErrorMessagesProps = {
  invalidCredentials: {
    title: 'Credenciais inválidas!',
    text: 'Email e/ou senha inválidos',
    variant: 'destructive',
  },
}
