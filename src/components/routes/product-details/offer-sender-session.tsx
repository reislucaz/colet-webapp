import { Offer } from '../../../@types/offer'
import { Card, CardContent } from '../../ui/card'

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-2">
        <div className="flex flex-col justify-center gap-4">
          <p className="text-2xl font-bold text-green-600">
            Valor: R$ {offer.amount.toFixed(2)}
          </p>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">
              Realizada em: {new Date(offer.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Negociante: {offer.sender.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
