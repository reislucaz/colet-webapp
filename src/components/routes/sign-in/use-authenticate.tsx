import { ErrorMessagesProps } from '@/@types/toast-messages'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { signinErrorMessages } from '@/constants/sign-in/sign-in-toast-messages'
import {
  authenticateSchema,
  AuthenticateType,
} from '@/validations/authenticate-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useAuthenticate() {
  const router = useRouter()

  const form = useForm<AuthenticateType>({
    resolver: zodResolver(authenticateSchema),
  })

  const [alertError, setAlertError] = useState<ErrorMessagesProps | undefined>(
    undefined,
  )

  async function onSubmit({ email, password }: AuthenticateType) {
    signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then((data) => {
      if (data?.ok) {
        router.replace(PrivateRoutes.HOME)
        setAlertError(undefined)
      }
      if (data?.error) {
        setAlertError(signinErrorMessages.invalidCredentials)
      }
    })
  }

  return { form, onSubmit, alertError }
}
