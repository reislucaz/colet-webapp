'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PublicRoutes } from '@/constants/routes/public-routes'
import { CreateUserType } from '@/validations/create-user-schema'
import { useRegisterFormField } from './register-form-field'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useUsersService } from '@/services/user'

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { createUsersService } = useUsersService()
  const { form, REGISTER_FORM_FIELD } = useRegisterFormField()

  function handleSuccess() {
    toast({
      variant: 'default',
      title: 'Usuário criado com sucesso',
    })

    router.push(PublicRoutes.SIGN_IN)
  }

  function handleError(e: any) {
    toast({
      variant: 'destructive',
      title: 'Erro ao criar usuário: ' + JSON.stringify(e, null, 2),
    })
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUsersService,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return (
    <FormRender<CreateUserType>
      constant={REGISTER_FORM_FIELD}
      form={form}
      onSubmit={mutateAsync}
    >
      <div className="flex w-full flex-col space-y-4">
        <Button className="w-full" type="submit" isLoading={isPending}>
          Cadastrar
        </Button>
        <p className="text-sm">
          Já tem uma conta ?
          <Link
            href={PublicRoutes.SIGN_IN}
            className="ml-1 text-primary hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </FormRender>
  )
}
