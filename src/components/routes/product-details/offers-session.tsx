'use client'
import { Offer } from '@/@types/offer'
import { Button } from '@/components/ui/button'
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
  return offers?.length ? offers?.map((item, index) => {
    return (
      <Card key={index}>
        <CardContent>{item.status}</CardContent>
      </Card>
    )
  }) : <Card>
    <CardContent className='flex flex-col gap-8 justify-center items-center'>
      <h2 className='text-2xl font-bold'>Nenhuma oferta realizada</h2>
      <Button className='font-bold w-full'>Realizar oferta</Button>
    </CardContent>
  </Card>
}
