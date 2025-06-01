'use client'
import { Offer } from '@/@types/offer'
import { Card, CardContent } from '@/components/ui/card'
import { offersQuerykey } from '@/constants/query-key/offers-query-key'
import { coletApi } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'

export async function OffersSession({ id }: { id: string }) {
  const { data: offers } = useQuery({
    queryFn: async () =>
      (await coletApi.get<Offer[]>(`/offers/recipient/${id}`)).data,
    queryKey: [offersQuerykey.LIST_ALL_OFFERS],
  })
  return offers?.map((item, index) => {
    return (
      <Card key={index}>
        <CardContent>{item.status}</CardContent>
      </Card>
    )
  })
}
