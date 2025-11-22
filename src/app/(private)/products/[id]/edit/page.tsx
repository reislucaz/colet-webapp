'use client'

import { Category } from '@/@types/category'
import { Pagination } from '@/@types/pagination'
import Loading from '@/components/loading'
import { coletApi } from '@/services/axios'
import { ProductService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../../../../../@types/product'
import { BackButton } from '../../../../../components/routes/edit/back-button'
import { EditForm } from '../../../../../components/routes/edit/edit-form'

export default function ProductUpdate({ params }: { params: { id: string } }) {
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useQuery<Product>({
    queryKey: ['product', params.id],
    queryFn: () => ProductService.getOne(params.id),
  })

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery<Pagination<Category>>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await coletApi.get<Pagination<Category>>('/categories')
      return data
    },
  })

  const isLoading = isLoadingProduct || isLoadingCategories
  const isError = isErrorProduct || isErrorCategories

  if (isLoading) {
    return (
      <div className='container my-10 flex h-96 items-center justify-center'>
        <Loading />
      </div>
    )
  }

  if (isError || !product || !categories) {
    return (
      <div className='container my-10 text-center'>
        <h1 className='text-2xl font-bold'>Erro ao carregar dados</h1>
        <p className='text-muted-foreground'>
          Não foi possível carregar os dados do produto ou das categorias. Tente novamente mais
          tarde.
        </p>
        <BackButton />
      </div>
    )
  }

  return (
    <div className='container my-10 flex flex-col items-center justify-center gap-8'>
      <BackButton />
      <div className='container flex w-full flex-row justify-between'>
        <EditForm product={product} categories={categories.data} />
      </div>
    </div>
  )
}
