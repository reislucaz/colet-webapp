'use client'
import { AuthorDetailsSession } from '@/components/routes/product-details/author-details-session'
import { OffersSession } from '@/components/routes/product-details/offers-session'
import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { ProductService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import * as motion from 'motion/react-client'
import { BackButton } from '../../../../../components/routes/edit/back-button'
import { ProductDetailsSession } from '../../../../../components/routes/product-details/product-details-session'
import Loading from '@/components/loading'

export default function ProductDetails({ params }: { params: { id: string } }) {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [productsQueryKey.GET_ONE_PRODUCT, params.id],
    queryFn: async () => await ProductService.getOne(params.id.toString()),
  })

  if (isLoading) {
    return (
      <div className='container my-10 flex h-96 items-center justify-center'>
        <Loading />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className='container my-10 text-center'>
        <h1 className='text-2xl font-bold'>Produto não encontrado</h1>
        <p className='text-muted-foreground'>
          O produto que você está procurando não existe ou foi removido.
        </p>
        <BackButton />
      </div>
    )
  }

  return (
    <div className='container my-10 flex flex-col items-center justify-center gap-8'>
      <BackButton />
      <div className='container flex flex-row justify-between gap-8'>
        <motion.div
          animate={{
            opacity: [0, 1],
            translateY: [-10, 0],
            transition: { duration: 0.5, ease: 'easeInOut', delay: 0.3 },
          }}
          className='flex h-full w-4/6 flex-col justify-between gap-8'
        >
          <ProductDetailsSession product={product} />
          <AuthorDetailsSession id={product?.authorId} />
        </motion.div>
        <OffersSession product={product} />
      </div>
    </div>
  )
}
