import { AuthorDetailsSession } from '@/components/routes/product-details/author-details-session'
import { OffersSession } from '@/components/routes/product-details/offers-session'
import * as motion from 'motion/react-client'
import { Product } from '../../../../../@types/product'
import { BackButton } from '../../../../../components/routes/edit/back-button'
import { ProductDetailsSession } from '../../../../../components/routes/product-details/product-details-session'
import { coletApi } from '../../../../../services/axios'
import { getServerSession } from 'next-auth'

export default async function ProductDetails({
  params,
}: {
  params: { id: string }
}) {
  const { data: product } = await coletApi.get<Product>(
    `/products/${params.id}`,
  )
  const session = await getServerSession()

  return (
    <div className="container my-10 flex flex-col items-center justify-center gap-8">
      <BackButton />
      <div className="container flex flex-row justify-between gap-8">
        <motion.div
          animate={{
            opacity: [0, 1],
            translateY: [-10, 0],
            transition: { duration: 0.5, ease: 'easeInOut', delay: 0.3 },
          }}
          className="flex h-full w-4/6 flex-col justify-between gap-8"
        >
          <ProductDetailsSession product={product} />
          <AuthorDetailsSession id={product?.authorId} />
        </motion.div>
        <OffersSession product={product} />
      </div>
    </div>
  )
}
