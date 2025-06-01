import { AuthorDetailsSession } from '@/components/routes/product-details/author-details-session'
import { OffersSession } from '@/components/routes/product-details/offers-session'
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
        <div className="flex w-4/6 flex-col justify-between gap-8">
          <ProductDetailsSession product={product} />
          <AuthorDetailsSession id={product?.authorId} />
        </div>
        <div className="flex h-full w-2/5 flex-col gap-5">
          <OffersSession id={product.authorId} />
        </div>
      </div>
    </div>
  )
}
