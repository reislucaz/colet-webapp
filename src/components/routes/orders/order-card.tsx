import { Elements } from '@stripe/react-stripe-js'
import { StripeElementsOptions } from '@stripe/stripe-js'
import {
  CheckCircle,
  Clock,
  Package,
  ShoppingBag,
  User,
  XCircle,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Order } from '../../../@types/order'
import { OrderService } from '../../../services/order-service'
import { formatCurrency } from '../../../utils/format-currency'
import { formatDate } from '../../../utils/format-date'
import { Badge } from '../../ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card'
import { PaymentSession } from '../product-details/payment-session'
import { OrderStatus } from './orders-tabs'

interface OrderCardProps {
  order: Order
  stripe: any
}

async function handlePaymentSuccess(order: Order) {
  await OrderService.updateStatus(order.id, 'PAID')
  toast.success('Pagamento realizado com sucesso')
}

export function OrderCard({ order, stripe }: OrderCardProps) {
  const getStatusConfig = (status: OrderStatus) => {
    const statusLower = status
    switch (statusLower) {
      case 'pending':
        return {
          bg: 'bg-gradient-to-br from-white to-yellow-50/50 dark:from-gray-900 dark:to-yellow-900/10',
          text: 'text-yellow-700 dark:text-yellow-400',
          border: 'border-l-yellow-500',
          badge:
            'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400',
          label: 'Pendente',
          icon: Clock,
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
        }
      case 'paid':
        return {
          bg: 'bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-green-900/10',
          text: 'text-green-700 dark:text-green-400',
          border: 'border-l-green-500',
          badge:
            'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400',
          label: 'Pago',
          icon: CheckCircle,
          iconColor: 'text-green-600 dark:text-green-400',
          iconBg: 'bg-green-100 dark:bg-green-900/30',
        }
      case 'cancelled':
        return {
          bg: 'bg-gradient-to-br from-white to-red-50/50 dark:from-gray-900 dark:to-red-900/10',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-l-red-500',
          badge:
            'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400',
          label: 'Cancelado',
          icon: XCircle,
          iconColor: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900/30',
        }
      default:
        return {
          bg: 'bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-900/10',
          text: 'text-blue-700 dark:text-blue-400',
          border: 'border-l-blue-500',
          badge:
            'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
          label: status,
          icon: ShoppingBag,
          iconColor: 'text-blue-600 dark:text-blue-400',
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        }
    }
  }

  const statusConfig = getStatusConfig(
    order.status.toLowerCase() as OrderStatus,
  )
  const { data: session } = useSession()
  const isOwner = order.product.authorId === (session?.user as any)?.id

  return (
    <Card
      className={`group relative overflow-hidden ${statusConfig.bg} ${statusConfig.border} border-l-4 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`${statusConfig.iconBg} rounded-full p-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
            >
              <statusConfig.icon
                className={`size-5 ${statusConfig.iconColor}`}
              />
            </div>
            <div>
              <CardTitle
                className={`${statusConfig.text} text-xl font-bold transition-colors`}
              >
                {formatCurrency(order.amount)}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Pedido #{order.id.slice(-8)}
              </CardDescription>
            </div>
          </div>
          <Badge
            className={`${statusConfig.badge} transition-transform duration-300 group-hover:scale-105`}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-gray-50/50 p-2 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Produto:
              </span>
            </div>
            <span
              className={`${statusConfig.text} text-sm font-semibold transition-colors group-hover:text-green-600 dark:group-hover:text-green-400`}
            >
              {order.product.name}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-50/50 p-2 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <User className="size-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Vendedor:
              </span>
            </div>
            <span className={`${statusConfig.text} text-sm font-medium`}>
              {order.seller.name}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-50/50 p-2 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Criado em:
              </span>
            </div>
            <span className={`${statusConfig.text} text-sm font-medium`}>
              {formatDate(order.createdAt)}
            </span>
          </div>
        </div>

        {order.status.toLowerCase() === 'pending' && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-white/50 p-3 dark:border-gray-700 dark:bg-gray-900/50">
            <Elements
              stripe={stripe}
              options={
                {
                  mode: 'payment',
                  currency: 'brl',
                  amount: (order.product.price ?? order.amount) * 100,
                } as StripeElementsOptions
              }
            >
              {!isOwner && (
                <PaymentSession
                  product={order.product}
                  order={order}
                  onPaymentSuccess={() => {
                    handlePaymentSuccess(order)
                  }}
                />
              )}
            </Elements>
          </div>
        )}

        <div className="h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
      </CardContent>
    </Card>
  )
}
