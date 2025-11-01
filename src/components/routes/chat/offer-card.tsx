import { CheckCircle, Clock, User, XCircle } from 'lucide-react'
import { Offer } from '../../../@types/offer'
import { formatCurrency } from '../../../utils/format-currency'
import { formatDate } from '../../../utils/format-date'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Separator } from '../../ui/separator'

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
  isDeclining,
}: OfferCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {
          bg: 'bg-gradient-to-br from-white to-yellow-50/50 dark:from-gray-900 dark:to-yellow-900/10',
          headerBg: 'bg-yellow-50/50 dark:bg-yellow-900/20',
          textColor: 'text-yellow-800 dark:text-yellow-400',
          badgeColor:
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
          icon: Clock,
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
          label: 'Aguardando Resposta',
          border: 'border-l-yellow-600',
        }
      case 'accepted':
        return {
          bg: 'bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-green-900/10',
          headerBg: 'bg-green-50/50 dark:bg-green-900/20',
          textColor: 'text-green-800 dark:text-green-400',
          badgeColor:
            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          icon: CheckCircle,
          iconColor: 'text-green-600 dark:text-green-400',
          iconBg: 'bg-green-100 dark:bg-green-900/30',
          label: 'Aceita',
          border: 'border-l-green-600',
        }
      case 'declined':
        return {
          bg: 'bg-gradient-to-br from-white to-red-50/50 dark:from-gray-900 dark:to-red-900/10',
          headerBg: 'bg-red-50/50 dark:bg-red-900/20',
          textColor: 'text-red-800 dark:text-red-400',
          badgeColor:
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
          icon: XCircle,
          iconColor: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          label: 'Recusada',
          border: 'border-l-red-600',
        }
      default:
        return {
          bg: 'bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50',
          headerBg: 'bg-gray-50/50 dark:bg-gray-900/20',
          textColor: 'text-gray-800 dark:text-gray-400',
          badgeColor:
            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
          icon: Clock,
          iconColor: 'text-gray-600 dark:text-gray-400',
          iconBg: 'bg-gray-100 dark:bg-gray-900/30',
          label: status,
          border: 'border-l-gray-600',
        }
    }
  }

  const statusConfig = getStatusConfig(offer.status)
  const isPending = offer.status.toLowerCase() === 'pending'

  return (
    <Card
      className={`group relative overflow-hidden ${statusConfig.bg} ${statusConfig.border} border-l-4 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardHeader className={`${statusConfig.headerBg} relative rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`${statusConfig.iconBg} rounded-full p-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
            >
              <statusConfig.icon
                className={`size-5 ${statusConfig.iconColor}`}
              />
            </div>
            <CardTitle
              className={`${statusConfig.textColor} text-lg font-bold`}
            >
              {isRecipient ? 'Oferta Recebida' : 'Sua Oferta'}
            </CardTitle>
          </div>
          <Badge
            className={`${statusConfig.badgeColor} transition-transform duration-300 group-hover:scale-105`}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative pt-4">
        <div className="space-y-4">
          <div className="text-center">
            <p className={`text-sm ${statusConfig.textColor} mb-1 font-medium`}>
              Valor Oferecido
            </p>
            <p
              className={`text-3xl font-bold ${statusConfig.textColor} transition-transform duration-300 group-hover:scale-105`}
            >
              {formatCurrency(offer.amount)}
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-gray-50/50 p-2 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <User className="size-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isRecipient ? 'Comprador:' : 'Vendedor:'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50/50 p-2 dark:bg-gray-800/50">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Data:
              </span>
              <span className={`text-sm font-medium ${statusConfig.textColor}`}>
                {formatDate(offer.createdAt.toString())}
              </span>
            </div>
          </div>

          {isRecipient && isPending && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    onClick={onReject}
                    disabled={isAccepting || isDeclining}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-700 transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    {isDeclining ? (
                      <>
                        <XCircle className="mr-2 size-4 animate-spin" />
                        Recusando...
                      </>
                    ) : (
                      <>
                        <XCircle className="mr-2 size-4" />
                        Recusar
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={onAccept}
                    disabled={isAccepting || isDeclining}
                    className="flex-1 bg-green-600 transition-all duration-300 hover:scale-105 hover:bg-green-700"
                  >
                    {isAccepting ? (
                      <>
                        <CheckCircle className="mr-2 size-4 animate-spin" />
                        Aceitando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 size-4" />
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
              <div className="rounded-lg bg-gray-50/50 p-3 text-center dark:bg-gray-800/50">
                <p className={`text-sm ${statusConfig.textColor} font-medium`}>
                  {isPending
                    ? 'Aguardando resposta do vendedor...'
                    : offer.status.toLowerCase() === 'accepted'
                      ? '✅ Sua oferta foi aceita! Verifique seus pedidos.'
                      : '❌ Sua oferta foi recusada.'}
                </p>
              </div>
            </>
          )}

          {!isPending && (
            <>
              <Separator />
              <div className="rounded-lg bg-gray-50/50 p-3 text-center dark:bg-gray-800/50">
                <p
                  className={`text-sm font-semibold ${statusConfig.textColor}`}
                >
                  {offer.status.toLowerCase() === 'accepted'
                    ? '✅ Negociação concluída com sucesso!'
                    : '❌ Oferta não foi aceita'}
                </p>
              </div>
            </>
          )}

          <div className="h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </CardContent>
    </Card>
  )
}
