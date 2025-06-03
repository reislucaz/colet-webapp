import { AuthorDetailsSession } from '@/components/routes/product-details/author-details-session'
import { OffersSession } from '@/components/routes/product-details/offers-session'
import * as motion from 'motion/react-client'
import { Product } from '../../../../../@types/product'
import { BackButton } from '../../../../../components/routes/edit/back-button'
import { ProductDetailsSession } from '../../../../../components/routes/product-details/product-details-session'
import { coletApi } from '../../../../../services/axios'

export default async function ProductDetails({
  params,
}: {
  params: { id: string }
}) {
  const { data: product } = await coletApi.get<Product>(
    `/products/${params.id}`,
  )

  return (
    <div className="container my-10 flex flex-col items-center justify-center gap-8">
      <BackButton />
      <div className="container flex flex-row justify-between gap-8">
        <motion.div animate={{ opacity: [0, 1], translateY: [-10, 0], transition: { duration: 0.5, ease: 'easeInOut', delay: 0.3 } }} className="flex w-4/6 h-full flex-col justify-between gap-8">
          <ProductDetailsSession product={product} />
          <AuthorDetailsSession id={product?.authorId} />
        </motion.div>
        <motion.div animate={{ opacity: [0, 1], translateY: [-10, 0], transition: { duration: 0.5, ease: 'easeInOut', delay: 0.7 } }} className="flex h-full w-2/5 flex-col gap-5">
          <h2 className="text-3xl font-bold">Ofertas:</h2>
          <OffersSession product={product} />
        </motion.div>
      </div>
    </div>
  )
}
