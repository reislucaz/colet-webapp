import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Loading from '../../../app/(private)/loading'
import { OfferService } from '../../../services/offer-service'
import { queryClient } from '../../../utils/query-client'
import { OfferCard } from './offer-card'
import { useState } from 'react'
import { OfferConfirmationDialog } from './offer-confirmation-dialog'

export function ChatOffer({ chatId }: { chatId?: string }) {
  const { data: session } = useSession()
  const userId = (session?.user as any)?.id || session?.user?.email || ''

  const [dialogState, setDialogState] = useState<{
    open: boolean
    action: 'accept' | 'decline' | null
  }>({
    open: false,
    action: null,
  })

  const {
    data: offer,
    isLoading,
    error,
  } = useQuery({
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
      setDialogState({ open: false, action: null })
    },
    onError: (error) => {
      toast.error('Erro ao recusar oferta: ' + error.message)
      setDialogState({ open: false, action: null })
    },
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
      setDialogState({ open: false, action: null })
    },
    onError: (error) => {
      toast.error('Erro ao aceitar oferta: ' + error.message)
      setDialogState({ open: false, action: null })
    },
  })

  const handleRejectOffer = () => {
    if (!offer) return
    setDialogState({ open: true, action: 'decline' })
  }

  const handleAcceptOffer = () => {
    if (!offer) return
    setDialogState({ open: true, action: 'accept' })
  }

  const handleConfirm = () => {
    if (dialogState.action === 'accept') {
      acceptOffer()
    } else if (dialogState.action === 'decline') {
      declineOffer()
    }
  }

  const isRecipient = offer?.recipientId === userId
  const isSender = offer?.senderId === userId

  if (isLoading) {
    return (
      <div className='p-4'>
        <Loading />
      </div>
    )
  }

  if (error || !offer) {
    return null
  }

  return (
    <div className='border-b p-4'>
      <OfferCard
        offer={offer}
        isRecipient={isRecipient}
        isSender={isSender}
        onAccept={handleAcceptOffer}
        onReject={handleRejectOffer}
        isAccepting={isAccepting}
        isDeclining={isDeclining}
      />
      <OfferConfirmationDialog
        open={dialogState.open}
        onOpenChange={(open) => setDialogState({ ...dialogState, open })}
        onConfirm={handleConfirm}
        title={dialogState.action === 'accept' ? 'Aceitar Oferta' : 'Recusar Oferta'}
        description={
          dialogState.action === 'accept'
            ? 'Tem certeza que deseja aceitar esta oferta? Um pedido será criado automaticamente.'
            : 'Tem certeza que deseja recusar esta oferta? Esta ação não pode ser desfeita.'
        }
        isPending={isAccepting || isDeclining}
      />
    </div>
  )
}
