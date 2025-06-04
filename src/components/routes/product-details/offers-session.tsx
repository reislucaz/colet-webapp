'use client'
import { Card, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../../../@types/product'
import { OfferService } from '../../../services/offer-service'
import { OfferModal } from './offer-modal'
import { OfferCard } from './offer-sender-session'

export function OffersSession(data: { product: Product }) {
  const { data: offers } = useQuery({
    queryKey: ['offers', data.product.id],
    queryFn: OfferService.getManyByUserId,
  })
  return <div className='flex flex-col gap-8'>
    {offers && offers.length > 0
      ? offers.map((item) =>
        <OfferCard offer={item} />
      )
      : <Card>
        <CardContent className='flex flex-col gap-8 justify-center items-center'>
          <h2 className='text-2xl font-bold'>Nenhuma oferta realizada</h2>
        </CardContent>
      </Card>
    }
    <OfferModal {...data.product} />

  </div>

}
