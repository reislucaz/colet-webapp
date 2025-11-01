import { PackageX } from 'lucide-react'
import { Order } from '../../../@types/order'
import { Card } from '../../ui/card'
import { OrderCard } from './order-card'

interface OrdersListProps {
  orders: Order[]
  stripe: any
  searchTerm: string
  emptyMessage?: string
}

export function OrdersList({
  orders,
  stripe,
  searchTerm,
  emptyMessage = 'Nenhum pedido encontrado.',
}: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 p-12 text-center shadow-lg dark:from-gray-900 dark:to-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex flex-col items-center gap-4">
          <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
            <PackageX className="size-12 text-gray-400 dark:text-gray-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {searchTerm
                ? 'Nenhum resultado encontrado'
                : 'Nenhum pedido ainda'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? 'Tente ajustar seus filtros de busca.'
                : emptyMessage}
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {orders.map((order, index) => (
        <div
          key={order.id}
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
          }}
        >
          <OrderCard order={order} stripe={stripe} />
        </div>
      ))}

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
    </div>
  )
}
