'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { Button } from '@/components/ui/button'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { useProductFormField } from './product-form-field'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { CreateProductType } from '@/validations/create-product-schema'
import { coletApi } from '@/services/axios'

export function ProductForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { form, PRODUCT_FORM_FIELD } = useProductFormField()

  function handleSuccess() {
    toast({
      variant: 'success',
      title: 'Anúncio criado com sucesso',
    })

    router.push(PrivateRoutes.PRODUCTS)
  }

  function handleError(e: any) {
    toast({
      variant: 'destructive',
      title:
        'Erro ao criar anúncio: ' + (e.response?.data?.message || e.message),
    })
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateProductType) => {
      const response = await coletApi.post('/products', data)
      return response.data
    },
    onSuccess: handleSuccess,
    onError: handleError,
  })

  const routes = useRouter()

  return (
    <FormRender<CreateProductType>
      constant={PRODUCT_FORM_FIELD}
      form={form}
      onSubmit={mutateAsync}
    >
      <div className="flex w-full items-center justify-end gap-2">
        <Button
          className="w-fit"
          type="button"
          variant={'outline'}
          onClick={() => routes.back()}
          isLoading={isPending}
        >
          Cancelar
        </Button>
        <Button className="w-fit" type="submit" isLoading={isPending}>
          Adicionar
        </Button>
      </div>
    </FormRender>
  )
}
