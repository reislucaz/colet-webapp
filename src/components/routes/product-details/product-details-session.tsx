import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Product } from '../../../@types/product'
import { formattedDateFNS } from '../../../utils/format-date'
import { StripeProvider } from '../../stripe-provider'
import { Card, CardContent } from '../../ui/card'
import { PaymentSession } from './payment-session'

export function ProductDetailsSession({ product }: { product: Product }) {
  const currencyFormatter = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })
  return (
    <div className="flex h-full flex-col gap-5">
      {product.images.length > 0 && (
        <Card className="size-full shadow-md">
          <CardContent>
            {product.images.map((image) => {
              return <Image key={image.id} alt={image.key} src={image.key} />
            })}
          </CardContent>
        </Card>
      )}
      <div>
        <h2 className="mb-4 text-3xl font-bold">Informações do produto:</h2>
        <Card className="size-full shadow-md">
          <CardContent className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <h3 className="text-3xl font-bold">{product.name}</h3>
              <span className="flex w-fit items-center justify-center rounded-full bg-gray-200 px-4 py-2 text-xs font-medium shadow-md">
                {product.category.name}
              </span>
            </div>
            <div className="flex gap-2 text-gray-500">
              <div className="flex gap-2">
                <MapPin size={16} />
                <p>{`${product.city}, ${product.state}`}</p>
              </div>
              |
              <div className="flex gap-2">
                <Clock size={16} />
                <p>{`Publicado em ${formattedDateFNS(new Date(product.createdAt))}`}</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-green-600">
              {currencyFormatter.format(product.price)}
            </h2>

            <StripeProvider productId={product.id}>
              <PaymentSession product={product} />
            </StripeProvider>

            <span className="mt-4 border border-gray-200"></span>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Descrição</h3>
              <p className="text-sm">{product.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
