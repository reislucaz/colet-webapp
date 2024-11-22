"use client"

import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}


export function ProductCarousel({ products }: { products: any[] }) {
  return <Carousel
    className="w-full"
    plugins={[
      Autoplay({
        delay: 2000
      })
    ]}
  >
    <CarouselContent className="w-full">
      {products.map((product, index) => (
        <CarouselItem key={index}>
          <Card className="w-full flex justify-center items-center h-40">
            <CardContent className="flex items-center justify-center">
              <span className="text-3xl font-semibold">{product.name}</span>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
}