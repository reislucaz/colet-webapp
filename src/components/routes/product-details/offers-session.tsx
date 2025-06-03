'use client'
import { Offer } from '@/@types/offer'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '../../../@types/product'
import { OfferModal } from './offer-modal'

export async function OffersSession(data: { product: Product }) {
  const offers: Offer[] = []
  return offers?.length ? offers?.map((item, index) => {
    return (
      <Card key={index}>
        <CardContent>{item.status}</CardContent>
      </Card>
    )
  }) : <Card>
    <CardContent className='flex flex-col gap-8 justify-center items-center'>
      <h2 className='text-2xl font-bold'>Nenhuma oferta realizada</h2>
      <OfferModal {...data.product} />
    </CardContent>
  </Card>
}
