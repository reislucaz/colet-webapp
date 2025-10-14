import { CheckCircleIcon, ClockIcon, FileTextIcon } from 'lucide-react'
import { BalanceTransaction } from '../../../services/wallet-service'
import { Badge } from '../../ui/badge'
import { Card, CardContent } from '../../ui/card'

interface TransactionCardProps {
  transaction: BalanceTransaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-green-50',
          border: 'border-l-green-500',
          badge: 'bg-green-100 text-green-800',
          label: 'Disponível',
          icon: <CheckCircleIcon className="text-green-600" />,
        }
      case 'pending':
        return {
          bg: 'bg-yellow-50',
          border: 'border-l-yellow-500',
          badge: 'bg-yellow-100 text-yellow-800',
          label: 'Pendente',
          icon: <ClockIcon className="text-yellow-600" />,
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-l-gray-500',
          badge: 'bg-gray-100 text-gray-800',
          label: status,
          icon: <FileTextIcon className="text-gray-600" />,
        }
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'charge':
        return 'Pagamento Recebido'
      case 'refund':
        return 'Reembolso'
      case 'adjustment':
        return 'Ajuste'
      case 'payout':
        return 'Saque'
      default:
        return type
    }
  }

  const statusConfig = getStatusConfig(transaction.status)

  return (
    <Card
      className={`bg-background ${statusConfig.border} border-l-4 transition-all duration-200 hover:shadow-md`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{statusConfig.icon}</span>
            <div>
              <p className="font-medium text-gray-900">
                {getTypeLabel(transaction.type)}
              </p>
              <p className="text-sm text-gray-600">
                {formatDate(transaction.created)}
              </p>
              <p className="text-xs text-gray-500">
                ID: {transaction.id.slice(-8)}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="space-y-1">
              <p className="text-lg font-bold text-green-600">
                +{formatCurrency(transaction.amount)}
              </p>
              <p className="text-sm text-red-600">
                -{formatCurrency(transaction.fee)}
              </p>
              <p className="text-sm font-medium text-gray-900">
                = {formatCurrency(transaction.net)}
              </p>
            </div>
            <Badge className={statusConfig.badge}>{statusConfig.label}</Badge>
          </div>
        </div>

        {transaction.fee_details.length > 0 && (
          <div className="mt-3 border-t border-gray-200 pt-3">
            <p className="mb-1 text-xs text-gray-500">Detalhes das taxas:</p>
            {transaction.fee_details.map((fee, index) => (
              <div
                key={index}
                className="flex justify-between text-xs text-gray-600"
              >
                <span>{fee.description}</span>
                <span>{formatCurrency(fee.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
