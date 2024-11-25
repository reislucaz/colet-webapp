'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { Button } from '@/components/ui/button'
import { PublicRoutes } from '@/constants/routes/public-routes'
import { useProductFormField } from './product-form-field'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { CreateProductType } from '@/validations/create-product-schema'

export function ProductForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { form, PRODUCT_FORM_FIELD } = useProductFormField()

  function handleSuccess() {
    toast({
      variant: 'success',
      title: 'Anúncio criado com sucesso',
    })

    router.push(PublicRoutes.HOME)
  }

  function handleError(e: any) {
    toast({
      variant: 'destructive',
      title: 'Erro ao criar anúncio: ' + JSON.stringify(e, null, 2),
    })
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateProductType) => {
      return fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
    },
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return (
    <FormRender<CreateProductType>
      constant={PRODUCT_FORM_FIELD}
      form={form}
      onSubmit={mutateAsync}
    >
      <div className="flex w-full flex-col space-y-4">
        <Button className="w-full" type="submit" isLoading={isPending}>
          Enviar
        </Button>
      </div>
    </FormRender>
  )
}
