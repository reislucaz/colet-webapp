'use client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Product } from '../../../@types/product'
import { formattedDateFNS } from '../../../utils/format-date'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../ui/carousel'
import { Card, CardContent } from '../../ui/card'
import { PaymentSession } from './payment-session'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')

export function ProductDetailsSession({ product }: { product: Product }) {
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
  const currencyFormatter = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })
  return (
    <div className='flex h-full flex-col gap-5'>
      {product?.images && product?.images?.length > 0 ? (
        <Carousel className='w-full'>
          <CarouselContent>
            {product.images.map((image) => (
              <CarouselItem key={image.id}>
                <Card className='overflow-hidden shadow-md'>
                  <CardContent className='relative aspect-video p-0'>
                    <Image
                      alt={product?.name}
                      src={`${BACKEND_URL}/${image.key}`}
                      fill
                      className='object-cover'
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute left-4' />
          <CarouselNext className='absolute right-4' />
        </Carousel>
      ) : (
        <Card className='flex aspect-video size-full items-center justify-center bg-muted shadow-md'>
          <p className='text-muted-foreground'>Sem imagem</p>
        </Card>
      )}
      <div>
        <h2 className='mb-4 text-3xl font-bold'>Informações do produto:</h2>
        <Card className='size-full shadow-md'>
          <CardContent className='flex flex-col gap-2'>
            <div className='flex w-full justify-between'>
              <h3 className='text-3xl font-bold'>{product?.name}</h3>
              <span className='flex w-fit items-center justify-center rounded-full bg-muted px-4 py-2 text-xs font-medium text-muted-foreground shadow-md'>
                {product?.category?.name}
              </span>
            </div>
            <div className='flex gap-2 text-muted-foreground'>
              <div className='flex gap-2'>
                <MapPin size={16} />
                <p>{`${product?.city}, ${product?.state}`}</p>
              </div>
              |
              <div className='flex gap-2'>
                <Clock size={16} />
                <p>{`Publicado em ${formattedDateFNS(new Date(product?.createdAt ?? new Date()))}`}</p>
              </div>
            </div>
            <h2 className='text-4xl font-bold text-primary'>
              {currencyFormatter.format(product?.price ?? 0)}
            </h2>

            <Elements
              stripe={stripe}
              options={{
                mode: 'payment',
                currency: 'brl',
                amount: (product?.price ?? 1) * 100,
              }}
            >
              <PaymentSession product={product} />
            </Elements>

            <span className='mt-4 border border-border'></span>
            <div className='flex flex-col gap-2'>
              <h3 className='font-medium'>Descrição</h3>
              <p className='text-sm'>{product?.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
