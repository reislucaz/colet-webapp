import { CheckCircle, Clock, Package, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Order } from '../../../@types/order'
import { formatCurrency } from '../../../utils/format-currency'
import { formatDate } from '../../../utils/format-date'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card'

interface RecentOrdersProps {
  orders: Order[]
}

const getStatusConfig = (status: string) => {
  const statusLower = status.toLowerCase()
  switch (statusLower) {
    case 'pending':
      return {
        badge:
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: Clock,
        iconColor: 'text-yellow-600 dark:text-yellow-400',
        label: 'Pendente',
      }
    case 'paid':
      return {
        badge:
          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        icon: CheckCircle,
        iconColor: 'text-green-600 dark:text-green-400',
        label: 'Pago',
      }
    case 'cancelled':
      return {
        badge: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        icon: XCircle,
        iconColor: 'text-red-600 dark:text-red-400',
        label: 'Cancelado',
      }
    default:
      return {
        badge:
          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        icon: Package,
        iconColor: 'text-gray-600 dark:text-gray-400',
        label: status,
      }
  }
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  if (orders.length === 0) {
    return (
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg dark:from-gray-900 dark:to-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <CardHeader className="relative">
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Últimos pedidos realizados</CardDescription>
        </CardHeader>

        <CardContent className="relative">
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Package className="mx-auto mb-2 size-12 text-gray-400 dark:text-gray-600" />
              <p>Nenhum pedido ainda</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:from-gray-900 dark:to-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimos 5 pedidos realizados</CardDescription>
          </div>
          <Link href="/orders">
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <div className="space-y-4">
          {orders.map((order, index) => {
            const statusConfig = getStatusConfig(order.status)
            const StatusIcon = statusConfig.icon

            return (
              <div
                key={order.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  className={`${statusConfig.badge.split(' ')[0]} rounded-full p-2`}
                >
                  <StatusIcon className={`size-5 ${statusConfig.iconColor}`} />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {order.product.name}
                    </p>
                    <Badge className={statusConfig.badge}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{formatDate(order.createdAt)}</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(order.amount)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
      </CardContent>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  )
}
