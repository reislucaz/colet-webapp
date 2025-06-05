'use client'
import { Card, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../../../@types/product'
import { OfferService } from '../../../services/offer-service'
import { OfferModal } from './offer-modal'
import { OfferCard } from './offer-sender-session'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'

export function OffersSession({ product }: { product: Product }) {
  const { data: offers } = useQuery({
    queryKey: ['offers', product.id],
    queryFn: OfferService.getManyByUserId,
  })
  const { data } = useSession()
  const isProductAuthor = product.authorId === data?.user.id
  return (
    <motion.div
      animate={{
        opacity: [0, 1],
        translateY: [-10, 0],
        transition: { duration: 0.5, ease: 'easeInOut', delay: 0.7 },
      }}
      className="flex h-full w-2/5 flex-col gap-5"
    >
      <h2 className="text-3xl font-bold">Ofertas:</h2>

      <div className="flex flex-col gap-8">
        {offers && offers.length > 0 ? (
          offers.map((item, index) => <OfferCard key={index} offer={item} />)
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-8">
              <h2 className="text-2xl font-bold">Nenhuma oferta realizada</h2>
            </CardContent>
          </Card>
        )}
        {!isProductAuthor && <OfferModal {...product} />}
      </div>
    </motion.div>
  )
}
