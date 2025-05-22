'use client'

import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Product } from '@/@types/product'

export function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
      }}
      className="w-11/12"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="w-full">
        {products.map((product, index) => (
          <CarouselItem key={index}>
            <Link href={`/products/${index}`} key={index}>
              <Card className="flex h-72 w-full items-center justify-center">
                <CardContent className="flex items-center justify-center">
                  <div>
                    {product.images?.[0]?.key && (
                      <Image
                        alt="Carousel image"
                        className="object-cover"
                        src={product.images?.[0]?.key}
                      />
                    )}
                    <p className="text-3xl font-semibold">{product.name}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
