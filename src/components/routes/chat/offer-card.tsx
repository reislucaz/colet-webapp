import { CheckCircle, Clock, User, XCircle } from "lucide-react"
import { Offer } from "../../../@types/offer"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Separator } from "../../ui/separator"

interface OfferCardProps {
  offer: Offer
  isRecipient: boolean
  isSender: boolean
  onAccept: () => void
  onReject: () => void
  isAccepting: boolean
  isDeclining: boolean
}

export function OfferCard({
  offer,
  isRecipient,
  isSender,
  onAccept,
  onReject,
  isAccepting,
  isDeclining
}: OfferCardProps) {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(offer.amount)

  const formattedDate = new Date(offer.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {
          bg: 'bg-background border-l-yellow-600 border-l-4',
          headerBg: 'bg-background',
          textColor: 'text-yellow-800',
          badgeColor: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="h-4 w-4" />,
          label: 'Aguardando Resposta'
        }
      case 'accepted':
        return {
          bg: 'bg-background border-l-green-600 border-l-4',
          headerBg: 'bg-green-100',
          textColor: 'text-green-800',
          badgeColor: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-4 w-4" />,
          label: 'Aceita'
        }
      case 'declined':
        return {
          bg: 'bg-background border-l-red-600 border-l-4',
          headerBg: 'bg-red-100',
          textColor: 'text-red-800',
          badgeColor: 'bg-red-100 text-red-800',
          icon: <XCircle className="h-4 w-4" />,
          label: 'Recusada'
        }
      default:
        return {
          bg: 'bg-background border-l-gray-600 border-l-4',
          headerBg: 'bg-gray-100',
          textColor: 'text-gray-800',
          badgeColor: 'bg-gray-100 text-gray-800',
          icon: <Clock className="h-4 w-4" />,
          label: status
        }
    }
  }

  const statusConfig = getStatusConfig(offer.status)
  const isPending = offer.status.toLowerCase() === 'pending'

  return (
    <Card className={`${statusConfig.bg} shadow-sm`}>
      <CardHeader className={`${statusConfig.headerBg} rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <CardTitle className={`${statusConfig.textColor} text-lg flex items-center gap-2`}>
            {statusConfig.icon}
            {isRecipient ? 'Oferta Recebida' : 'Sua Oferta'}
          </CardTitle>
          <Badge className={statusConfig.badgeColor}>
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="text-center">
            <p className={`text-sm ${statusConfig.textColor} mb-1`}>Valor Oferecido</p>
            <p className={`text-3xl font-bold ${statusConfig.textColor}`}>
              {formattedAmount}
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className={`${statusConfig.textColor} flex items-center gap-1`}>
                <User className="h-3 w-3" />
                {isRecipient ? 'Comprador:' : 'Vendedor:'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={`${statusConfig.textColor}`}>Data:</span>
              <span className={`font-medium ${statusConfig.textColor}`}>{formattedDate}</span>
            </div>
          </div>

          {isRecipient && isPending && (
            <>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    onClick={onReject}
                    disabled={isAccepting || isDeclining}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-700"
                  >
                    {isDeclining ? (
                      <>
                        <XCircle className="mr-2 h-4 w-4 animate-spin" />
                        Recusando...
                      </>
                    ) : (
                      <>
                        <XCircle className="mr-2 h-4 w-4" />
                        Recusar
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={onAccept}
                    disabled={isAccepting || isDeclining}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isAccepting ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4 animate-spin" />
                        Aceitando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Aceitar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}

          {isSender && (
            <>
              <Separator />
              <div className="text-center">
                <p className={`text-sm ${statusConfig.textColor}`}>
                  {isPending
                    ? 'Aguardando resposta do vendedor...'
                    : offer.status.toLowerCase() === 'accepted'
                      ? 'Sua oferta foi aceita! Verifique seus pedidos.'
                      : 'Sua oferta foi recusada.'
                  }
                </p>
              </div>
            </>
          )}

          {!isPending && (
            <>
              <Separator />
              <div className="text-center">
                <p className={`text-sm font-medium ${statusConfig.textColor}`}>
                  {offer.status.toLowerCase() === 'accepted'
                    ? '✅ Negociação concluída com sucesso!'
                    : '❌ Oferta não foi aceita'
                  }
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

