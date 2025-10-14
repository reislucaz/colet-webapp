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
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          {searchTerm
            ? 'Nenhum pedido encontrado com os filtros aplicados.'
            : emptyMessage}
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} stripe={stripe} />
      ))}
    </div>
  )
}
