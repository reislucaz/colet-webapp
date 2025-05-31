import { Offer } from '@/@types/offer'
import { Card, CardContent } from '@/components/ui/card'
import { coletApi } from '@/services/axios'

export async function OffersSession({ id }: { id: string }) {
  const { data: offers } = await coletApi.get<Offer[]>(`offers/recipient/${id}`)
  return offers.map((item, index) => {
    return (
      <Card key={index}>
        <CardContent>{item.status}</CardContent>
      </Card>
    )
  })
}
