'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { useAuthenticateFormField } from './authenticate-form-field'
import { AuthenticateType } from '@/validations/authenticate-schema'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PublicRoutes } from '@/constants/routes/public-routes'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useAuthenticate } from './use-authenticate'

export function AuthenticateForm() {
  const { AUTHENTICATE_FORM_FIELD } = useAuthenticateFormField()

  const { alertError, form, onSubmit } = useAuthenticate()

  return (
    <FormRender<AuthenticateType>
      constant={AUTHENTICATE_FORM_FIELD}
      form={form}
      onSubmit={onSubmit}
    >
      <div className="flex w-full flex-col space-y-4">
        {alertError && (
          <Alert variant={alertError.variant as never}>
            <AlertCircle className="size-4" />
            <AlertTitle>{alertError.title}</AlertTitle>
            <AlertDescription>{alertError.text}</AlertDescription>
          </Alert>
        )}
        <Button className="w-full" type="submit">
          Entrar
        </Button>
        <p className="text-sm">
          Ainda não tem uma conta ?
          <Link
            href={PublicRoutes.REGISTER}
            className="ml-1 text-primary hover:underline"
          >
            Crie uma conta
          </Link>
        </p>
      </div>
    </FormRender>
  )
}
