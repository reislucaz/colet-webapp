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
import { ProductService } from '@/services/product'
import { ImageUpload } from '@/components/shared/form/image-upload'

export function ProductForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { form, PRODUCT_FORM_FIELD } = useProductFormField()

  const { mutateAsync: uploadImages, isPending: isUploading } = useMutation({
    mutationFn: (data: { productId: string; files: File[] }) =>
      ProductService.uploadImages(data.productId, data.files),
    onError: (e: any) => {
      toast({
        variant: 'destructive',
        title:
          'Produto criado, mas erro ao enviar imagens: ' + (e.response?.data?.message || e.message),
      })
      router.push(PrivateRoutes.PRODUCTS)
    },
  })

  const { mutateAsync: createProduct, isPending: isCreating } = useMutation({
    mutationFn: async (data: CreateProductType) => {
      const { images, ...productData } = data
      const response = await coletApi.post('/products', productData)
      return { product: response.data, images }
    },
    onSuccess: async (data) => {
      const { product, images } = data
      if (images && images.length > 0) {
        await uploadImages({ productId: product.id, files: images })
      }
      toast({
        variant: 'success',
        title: 'Anúncio criado com sucesso',
      })
      router.push(PrivateRoutes.PRODUCTS)
    },
    onError: (e: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar anúncio: ' + (e.response?.data?.message || e.message),
      })
    },
  })

  const isPending = isCreating || isUploading

  return (
    <FormRender<CreateProductType>
      constant={PRODUCT_FORM_FIELD}
      form={form}
      onSubmit={createProduct}
    >
      <ImageUpload form={form} fieldName='images' />
      <div className='flex w-full items-center justify-end gap-2 pt-4'>
        <Button
          className='w-fit'
          type='button'
          variant={'outline'}
          onClick={() => router.back()}
          isLoading={isPending}
        >
          Cancelar
        </Button>
        <Button className='w-fit' type='submit' isLoading={isPending}>
          Adicionar
        </Button>
      </div>
    </FormRender>
  )
}
