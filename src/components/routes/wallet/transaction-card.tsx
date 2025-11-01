import {
  ArrowDownCircle,
  ArrowUpCircle,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
} from 'lucide-react'
import { BalanceTransaction } from '../../../services/wallet-service'
import { formatCurrency } from '../../../utils/format-currency'
import { formatTimestamp } from '../../../utils/format-date'
import { Badge } from '../../ui/badge'
import { Card, CardContent } from '../../ui/card'

interface TransactionCardProps {
  transaction: BalanceTransaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-green-900/10',
          border: 'border-l-green-500',
          badge:
            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          label: 'Disponível',
          icon: CheckCircleIcon,
          iconColor: 'text-green-600 dark:text-green-400',
          iconBg: 'bg-green-100 dark:bg-green-900/30',
        }
      case 'pending':
        return {
          bg: 'bg-gradient-to-br from-white to-yellow-50/50 dark:from-gray-900 dark:to-yellow-900/10',
          border: 'border-l-yellow-500',
          badge:
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
          label: 'Pendente',
          icon: ClockIcon,
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
        }
      default:
        return {
          bg: 'bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50',
          border: 'border-l-gray-500',
          badge:
            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
          label: status,
          icon: FileTextIcon,
          iconColor: 'text-gray-600 dark:text-gray-400',
          iconBg: 'bg-gray-100 dark:bg-gray-900/30',
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
      className={`group relative overflow-hidden ${statusConfig.bg} ${statusConfig.border} border-l-4 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardContent className="relative p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-1 items-start gap-3">
            <div
              className={`${statusConfig.iconBg} rounded-full p-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
            >
              <statusConfig.icon
                className={`size-5 ${statusConfig.iconColor}`}
              />
            </div>

            <div className="flex-1 space-y-1">
              <p className="font-semibold text-gray-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
                {getTypeLabel(transaction.type)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatTimestamp(transaction.created)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                ID: {transaction.id.slice(-8)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="space-y-1 text-right">
              <div className="flex items-center gap-1">
                <ArrowUpCircle className="size-4 text-green-600 dark:text-green-400" />
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  +{formatCurrency(transaction.amount)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <ArrowDownCircle className="size-4 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  -{formatCurrency(transaction.fee)}
                </p>
              </div>
              <div className="mt-1 border-t border-gray-200 pt-1 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  = {formatCurrency(transaction.net)}
                </p>
              </div>
            </div>
            <Badge
              className={`${statusConfig.badge} transition-transform duration-300 group-hover:scale-105`}
            >
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {transaction.fee_details && transaction.fee_details.length > 0 && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50/50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
            <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">
              Detalhes das taxas:
            </p>
            <div className="space-y-1">
              {transaction.fee_details.map((fee, index) => (
                <div
                  key={index}
                  className="flex justify-between text-xs text-gray-700 dark:text-gray-300"
                >
                  <span>{fee.description}</span>
                  <span className="font-medium">
                    {formatCurrency(fee.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
      </CardContent>
    </Card>
  )
}
