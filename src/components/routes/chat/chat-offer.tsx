import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import Loading from "../../../app/(private)/loading"
import { OfferService } from "../../../services/offer-service"
import { queryClient } from "../../../utils/query-client"
import { OfferCard } from "./offer-card"

export function ChatOffer({ chatId }: { chatId?: string }) {
  const { data: session } = useSession()
  const userId = (session?.user as any)?.id || session?.user?.email || ''

  const { data: offer, isLoading, error } = useQuery({
    queryKey: ['chat-offer', chatId],
    queryFn: () => {
      if (chatId) {
        return OfferService.getByChatId(chatId)
      }
      return null
    },
    enabled: !!chatId,
    retry: 1,
  })

  const { mutate: declineOffer, isPending: isDeclining } = useMutation({
    mutationFn: () => {
      if (!offer?.id) {
        throw new Error('ID da oferta não encontrado')
      }
      return OfferService.decline(offer.id)
    },
    onSuccess: () => {
      toast.success('Oferta recusada com sucesso')
      queryClient.invalidateQueries({ queryKey: ['chat-offer', chatId] })
      queryClient.invalidateQueries({ queryKey: ['chat-list'] })
    },
    onError: (error) => {
      toast.error('Erro ao recusar oferta: ' + error.message)
    }
  })

  const { mutate: acceptOffer, isPending: isAccepting } = useMutation({
    mutationFn: () => {
      if (!offer?.id) {
        throw new Error('ID da oferta não encontrado')
      }
      return OfferService.accept(offer.id)
    },
    onSuccess: () => {
      toast.success('Oferta aceita com sucesso! Um pedido foi criado.')
      queryClient.invalidateQueries({ queryKey: ['chat-offer', chatId] })
      queryClient.invalidateQueries({ queryKey: ['chat-list'] })
      queryClient.invalidateQueries({ queryKey: ['Orders'] })
    },
    onError: (error) => {
      toast.error('Erro ao aceitar oferta: ' + error.message)
    }
  })

  const handleRejectOffer = () => {
    if (!offer) return

    // Confirmar ação
    if (window.confirm('Tem certeza que deseja recusar esta oferta? Esta ação não pode ser desfeita.')) {
      declineOffer()
    }
  }

  const handleAcceptOffer = () => {
    if (!offer) return

    // Confirmar ação
    if (window.confirm('Tem certeza que deseja aceitar esta oferta? Um pedido será criado automaticamente.')) {
      acceptOffer()
    }
  }

  // Verificar se o usuário atual é o vendedor (recipient da oferta)
  const isRecipient = offer?.recipientId === userId
  const isSender = offer?.senderId === userId

  if (isLoading) {
    return (
      <div className="p-4">
        <Loading />
      </div>
    )
  }

  if (error || !offer) {
    return null // Não mostrar nada se não houver oferta
  }

  return (
    <div className="p-4 border-b bg-gray-50">
      <OfferCard
        offer={offer}
        isRecipient={isRecipient}
        isSender={isSender}
        onAccept={handleAcceptOffer}
        onReject={handleRejectOffer}
        isAccepting={isAccepting}
        isDeclining={isDeclining}
      />
    </div>
  )
}