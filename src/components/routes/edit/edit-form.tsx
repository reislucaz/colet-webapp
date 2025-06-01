'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEditFormConstant } from '../../../hooks/use-edit-form-constant'
import { FormRender } from '../../../shared/form/form-field-dynamic/FormRender'
import {
  editProductSchema,
  EditProductSchemaType,
} from '../../../validations/edit-product-schema'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useProducts } from '@/hooks/use-products'
import { Product } from '@/@types/product'
import { Category } from '@/@types/category'

export function EditForm({
  product,
  categories,
}: {
  product: Product
  categories: Category[]
}) {
  const currentCategory = categories.find(
    (item) => item.id === product.category.id,
  )
  const methods = useForm<EditProductSchemaType>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product.name,
      city: product.city,
      description: product.description,
      neighborhood: product.neighborhood,
      price: product.price,
      state: product.state,
      category: {
        label: currentCategory?.name,
        value: currentCategory?.id,
      } as any,
    },
  })
  const { EDIT_FORM_CONSTANT } = useEditFormConstant(categories)
  const { back } = useRouter()
  const { updateProductMutation } = useProducts()
  return (
    <FormRender
      className="flex size-full flex-col"
      constant={EDIT_FORM_CONSTANT}
      form={methods}
      onSubmit={updateProductMutation.mutateAsync}
    >
      <div className="flex w-full items-center justify-end gap-2">
        <Button
          className="w-fit"
          type="button"
          variant={'outline'}
          onClick={() => back()}
          isLoading={updateProductMutation.isPending}
        >
          Cancelar
        </Button>
        <Button
          className="w-fit"
          type="submit"
          isLoading={updateProductMutation.isPending}
        >
          Atualizar
        </Button>
      </div>
    </FormRender>
  )
}
