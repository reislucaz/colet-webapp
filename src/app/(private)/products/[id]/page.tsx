'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeftCircle, List, Recycle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductPage() {
  const productImages = Array.from({ length: 3 }).map(() => {
    return {
      href: 'https://plus.unsplash.com/premium_vector-1732084525377-b99a0bedcc41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }
  })

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <header className="flex w-full flex-col gap-2">
        <h2 className="border-l-2 border-l-primary pl-2 text-2xl">
          Nome do produto
        </h2>
        <Link
          href={'/'}
          className="flex w-fit items-center gap-1 border-b-primary transition-all hover:border-b"
        >
          <ChevronLeftCircle size={16} />
          Voltar
        </Link>
      </header>
      <section className="flex w-full flex-col items-center justify-center gap-16 xl:flex-row">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full xl:w-3/5"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="w-full">
            {productImages.map((product, index) => (
              <CarouselItem key={index}>
                <Card className="flex h-96 w-full items-center justify-center">
                  <CardContent className="flex w-full items-center justify-center">
                    <Image
                      className="w-full object-contain"
                      width={2000}
                      height={500}
                      src={product.href}
                      alt="product-image"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <section className="flex w-full flex-col justify-start gap-5 xl:w-1/5">
          <div className="w-full rounded-md bg-accent p-5">
            <div className="flex w-full items-center justify-between">
              <h4 className="text-2xl text-primary">R$ 200,00</h4>
              <section>
                <div className="flex items-center justify-center gap-2 rounded-full bg-background p-2 px-5 text-primary">
                  <Recycle size={16} />
                  Metal
                </div>
              </section>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md bg-accent p-5">
            <h4 className="text-xl">Gustavo</h4>
            <h5 className="text-lg text-primary">(62) 9 9999-9999</h5>
            <div className="mt-3 flex items-center justify-center gap-5">
              <Button className="rounded-full">Comprar</Button>
              <Button className="rounded-full" variant="outline">
                Chat
              </Button>
            </div>
            <Link
              className="mt-5 flex items-center gap-2 hover:text-primary"
              href={`/products?salesPerson=Gustavo`}
            >
              <List size={16} />
              Visualizar anúncios
            </Link>
          </div>
        </section>
      </section>
      <footer className="mt-5 flex h-full flex-col gap-5">
        <section className="flex flex-col justify-start gap-5">
          <h4 className="text-lg">Descrição</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt sed,
            maiores numquam neque quod dolore, dolores odit quae ullam
            reiciendis quas deserunt ipsum saepe, dolorum iure ut repellendus
            impedit facere.
          </p>
        </section>
        <section>
          <section className="flex flex-col justify-start gap-5 border-t border-t-accent pt-5">
            <h4 className="text-lg">Localização</h4>
            <section className="flex w-full gap-5">
              <div className="flex items-center justify-center gap-2">
                <h5 className="font-medium">Cep:</h5>
                <div className="flex items-center justify-center rounded-full bg-accent p-2 px-5">
                  <p className="font-light">75125370</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h5 className="font-medium">Estado:</h5>
                <div className="flex items-center justify-center rounded-full bg-accent p-2 px-5">
                  <p className="font-light">Goiás</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h5 className="font-medium">Município:</h5>
                <div className="flex items-center justify-center rounded-full bg-accent p-2 px-5">
                  <p className="font-light">Anápolis</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h5 className="font-medium">Bairro:</h5>
                <div className="flex items-center justify-center rounded-full bg-accent p-2 px-5">
                  <p className="font-light">Santo André</p>
                </div>
              </div>
            </section>
          </section>
        </section>
      </footer>
    </div>
  )
}
