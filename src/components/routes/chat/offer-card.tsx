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

interface StatusConfig {
  bg: string
  headerBg: string
  textColor: string
  badgeColor: string
  icon: typeof Clock
  iconColor: string
  iconBg: string
  label: string
  border: string
}

const statusConfigs: Record<string, StatusConfig> = {
  pending: {
    bg: 'bg-gradient-to-br from-background to-yellow-500/10 dark:from-card dark:to-yellow-500/10',
    headerBg: 'bg-yellow-500/10 dark:bg-yellow-500/20',
    textColor: 'text-yellow-800 dark:text-yellow-300',
    badgeColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300',
    icon: Clock,
    iconColor: 'text-yellow-600 dark:text-yellow-300',
    iconBg: 'bg-yellow-100 dark:bg-yellow-500/20',
    label: 'Aguardando Resposta',
    border: 'border-l-yellow-500',
  },
  accepted: {
    bg: 'bg-gradient-to-br from-background to-green-500/10 dark:from-card dark:to-green-500/10',
    headerBg: 'bg-green-500/10 dark:bg-green-500/20',
    textColor: 'text-green-800 dark:text-green-400',
    badgeColor: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400',
    icon: CheckCircle,
    iconColor: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-100 dark:bg-green-500/20',
    label: 'Aceita',
    border: 'border-l-green-500',
  },
  declined: {
    bg: 'bg-gradient-to-br from-background to-red-500/10 dark:from-card dark:to-red-500/10',
    headerBg: 'bg-red-500/10 dark:bg-red-500/20',
    textColor: 'text-red-800 dark:text-red-400',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400',
    icon: XCircle,
    iconColor: 'text-red-600 dark:text-red-400',
    iconBg: 'bg-red-100 dark:bg-red-500/20',
    label: 'Recusada',
    border: 'border-l-red-500',
  },
  default: {
    bg: 'bg-gradient-to-br from-background to-muted dark:from-card dark:to-muted',
    headerBg: 'bg-muted/50 dark:bg-card',
    textColor: 'text-foreground',
    badgeColor: 'bg-muted text-muted-foreground',
    icon: Clock,
    iconColor: 'text-muted-foreground',
    iconBg: 'bg-muted',
    label: '',
    border: 'border-l-border',
  },
}

const getStatusConfig = (status: string): StatusConfig => {
  const normalizedStatus = status.toLowerCase()
  return (
    statusConfigs[normalizedStatus] || {
      ...statusConfigs.default,
      label: status,
    }
  )
}

const getOfferMessage = (isPending: boolean, status: string, isSender: boolean): string => {
  if (isSender) {
    if (isPending) return 'Aguardando resposta do vendedor...'
    if (status === 'accepted') return '✅ Sua oferta foi aceita! Verifique seus pedidos.'
    return '❌ Sua oferta foi recusada.'
  }
  return ''
}

const getCompletionMessage = (status: string): string => {
  return status === 'accepted' ? '✅ Negociação concluída com sucesso!' : '❌ Oferta não foi aceita'
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
  const statusConfig = getStatusConfig(offer.status)
  const isPending = offer.status.toLowerCase() === 'pending'
  const StatusIcon = statusConfig.icon

  return (
    <Card
      className={`group relative overflow-hidden ${statusConfig.bg} ${statusConfig.border} border-l-4 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10`}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

      <CardHeader className={`${statusConfig.headerBg} relative rounded-t-lg`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div
              className={`${statusConfig.iconBg} rounded-full p-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
            >
              <StatusIcon className={`size-5 ${statusConfig.iconColor}`} />
            </div>
            <CardTitle className={`${statusConfig.textColor} text-lg font-bold`}>
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

      <CardContent className='relative pt-4'>
        <div className='space-y-4'>
          <div className='text-center'>
            <p className={`mb-1 text-sm font-medium ${statusConfig.textColor}`}>Valor Oferecido</p>
            <p
              className={`text-3xl font-bold transition-transform duration-300 group-hover:scale-105 ${statusConfig.textColor}`}
            >
              {formatCurrency(offer.amount)}
            </p>
          </div>

          <Separator />

          <div className='space-y-2'>
            <div className='flex items-center justify-between rounded-lg bg-muted p-2'>
              <div className='flex items-center gap-2'>
                <User className='size-4 text-muted-foreground' />
                <span className='text-sm font-medium text-muted-foreground'>
                  {isRecipient ? 'Comprador:' : 'Vendedor:'}
                </span>
              </div>
            </div>
            <div className='flex items-center justify-between rounded-lg bg-muted p-2'>
              <span className='text-sm font-medium text-muted-foreground'>Data:</span>
              <span className={`text-sm font-medium ${statusConfig.textColor}`}>
                {formatDate(offer.createdAt.toString())}
              </span>
            </div>
          </div>

          {isRecipient && isPending && (
            <>
              <Separator />
              <div className='space-y-3'>
                <div className='flex gap-2'>
                  <Button
                    onClick={onReject}
                    disabled={isAccepting || isDeclining}
                    variant='outline'
                    className='flex-1 border-destructive text-destructive transition-all duration-300 hover:scale-105 hover:bg-destructive/10'
                  >
                    {isDeclining ? (
                      <>
                        <XCircle className='mr-2 size-4 animate-spin' />
                        Recusando...
                      </>
                    ) : (
                      <>
                        <XCircle className='mr-2 size-4' />
                        Recusar
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={onAccept}
                    disabled={isAccepting || isDeclining}
                    className='flex-1 transition-all duration-300 hover:scale-105'
                  >
                    {isAccepting ? (
                      <>
                        <CheckCircle className='mr-2 size-4 animate-spin' />
                        Aceitando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className='mr-2 size-4' />
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
              <div className='rounded-lg bg-muted p-3 text-center'>
                <p className={`text-sm font-medium ${statusConfig.textColor}`}>
                  {getOfferMessage(isPending, offer.status.toLowerCase(), true)}
                </p>
              </div>
            </>
          )}

          {!isPending && (
            <>
              <Separator />
              <div className='rounded-lg bg-muted p-3 text-center'>
                <p className={`text-sm font-semibold ${statusConfig.textColor}`}>
                  {getCompletionMessage(offer.status.toLowerCase())}
                </p>
              </div>
            </>
          )}

          <div className='h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100' />
        </div>
      </CardContent>
    </Card>
  )
}
