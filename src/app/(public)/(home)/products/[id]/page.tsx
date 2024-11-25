import { Button } from '@/components/ui/button'
import { Icon } from '@/shared/icon'

import { ChevronLeftCircle, PhoneCallIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const productData = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/products/' + params.id,
    { cache: 'no-cache' },
  )
    .catch((err) => {
      console.error(err)
      notFound()
    })
    .then((res) => res.json())

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <header className="flex w-full flex-col gap-2">
        <h2 className="border-l-2 border-l-primary pl-2 text-2xl">
          {productData.name}
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
        <section className="flex w-full flex-col justify-start gap-5 xl:w-1/5">
          <div className="w-full rounded-md bg-accent p-5">
            <div className="flex w-full items-center justify-between">
              {productData.price ? (
                <h4 className="text-2xl text-primary">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(productData.price)}
                </h4>
              ) : (
                <h4 className="text-2xl text-primary">Preço não informado</h4>
              )}
              <section>
                <div className="flex items-center justify-center gap-2 rounded-full bg-background p-2 px-5 text-primary">
                  <Icon
                    name={productData.category.iconKey}
                    className="transition-all ease-in group-hover:scale-125"
                  />
                  {productData.category.name}
                </div>
              </section>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md bg-accent p-5">
            <h4 className="text-xl">{productData.authorName}</h4>
            <h5 className="text-lg text-primary">{productData.authorPhone}</h5>
            <div className="mt-3 flex items-center justify-center gap-5">
              <Button className="flex gap-2 rounded-full">
                <PhoneCallIcon size={16} />
                Whatsapp
              </Button>
            </div>
          </div>
        </section>
      </section>
      <footer className="mt-5 flex h-full flex-col gap-5">
        <section className="flex flex-col justify-start gap-5">
          <h4 className="text-lg">Descrição</h4>
          <p>{productData.description}</p>
        </section>
        <section>
          <section className="flex flex-col justify-start gap-5 border-t border-t-accent pt-5">
            <h4 className="text-lg">Localização</h4>
            <section className="flex w-full gap-5">
              <div className="flex items-center justify-center gap-2">
                <h5 className="font-medium">Estado:</h5>
                <div className="flex items-center justify-center rounded-full bg-accent p-2 px-5">
                  <p className="font-light ">{productData.state}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h5 className="font-medium">Município:</h5>
                <div className="flex items-center justify-center rounded-full bg-accent p-2 px-5">
                  <p className="font-light">{productData.city}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h5 className="font-medium">Bairro:</h5>
                <div className="flex items-center justify-center rounded-full bg-accent p-2 px-5">
                  <p className="font-light">{productData.neighborhood}</p>
                </div>
              </div>
            </section>
          </section>
        </section>
      </footer>
    </div>
  )
}
