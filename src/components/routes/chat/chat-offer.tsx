import { useMutation, useQuery } from "@tanstack/react-query"
import { CircleCheck, CircleX } from "lucide-react"
import Loading from "../../../app/(private)/loading"
import { OfferService } from "../../../services/offer-service"
import { queryClient } from "../../../utils/query-client"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"

export function ChatOffer({ chatId }: { chatId?: string }) {
  const { data: offer, isLoading } = useQuery({
    queryKey: ['chat-offer', chatId],
    queryFn: () => {
      if (chatId) {
        return OfferService.getByChatId(chatId)
      }
      return null
    }
  })
  const { mutate: declineOffer, isPending: isDeclining } = useMutation({
    mutationFn: () => {
      if (offer?.id) {
        return OfferService.decline(offer.id)
      }
      return Promise.resolve(null)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['chat-offer', chatId] })
    }
  })

  const { mutate: acceptOffer, isPending: isAccepting } = useMutation({
    mutationFn: () => {
      if (offer?.id) {
        return OfferService.accept(offer.id)
      }
      return Promise.resolve(null)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['chat-offer', chatId] })
    }
  })

  const formattedAmount = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(offer?.amount || 0)

  const handleRejectOffer = () => {
    declineOffer()
  }

  const handleAcceptOffer = () => {
    acceptOffer()
  }
  if (isLoading) return <Loading />

  return <Card className="shadow-none border-green-800 border bg-green-100">
    <CardHeader>
      <CardTitle className="text-green-800">Proposta de compra</CardTitle>
      <Badge className="bg-green-800 text-white text-xs w-fit">
        {offer?.status}
      </Badge>
    </CardHeader>
    <CardContent >
      <p className="text-xl text-green-800 font-bold">
        {formattedAmount}
      </p>
      {offer?.status === 'pending' && (
        <div className="flex gap-2 w-full justify-end items-center">
          <Button isLoading={isDeclining} onClick={handleRejectOffer} variant="outline" className="flex items-center gap-2">
            <CircleX />
            Rejeitar
          </Button>
          <Button isLoading={isAccepting} onClick={handleAcceptOffer} variant="default" className="flex items-center gap-2">
            <CircleCheck />
            Aceitar
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
}