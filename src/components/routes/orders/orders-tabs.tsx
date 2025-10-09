import { Order } from "../../../@types/order"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { OrdersList } from "./orders-list"
import { OrdersSearch } from "./orders-search"

export type OrderStatus = 'all' | 'pending' | 'finished' | 'cancelled'

interface OrdersTabsProps {
  orders: Order[]
  stripe: any
  searchTerm: string
  onSearchChange: (value: string) => void
  activeTab: OrderStatus
  onTabChange: (tab: OrderStatus) => void
}

export function OrdersTabs({
  orders,
  stripe,
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange
}: OrdersTabsProps) {

  const filteredOrders = orders?.filter(order => {
    const matchesSearch =
      order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  }) || []

  const allOrders = filteredOrders
  const pendingOrders = filteredOrders.filter(order => order.status.toLowerCase() === 'pending')
  const finishedOrders = filteredOrders.filter(order => order.status.toLowerCase() === 'finished')
  const cancelledOrders = filteredOrders.filter(order => order.status.toLowerCase() === 'cancelled')

  const getTabLabel = (status: OrderStatus, count: number) => {
    const labels = {
      all: 'Todos',
      pending: 'Pendentes',
      finished: 'Finalizados',
      cancelled: 'Cancelados'
    }
    return `${labels[status]} (${count})`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <OrdersSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </div>

      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as OrderStatus)}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">
            {getTabLabel('all', allOrders.length)}
          </TabsTrigger>
          <TabsTrigger value="pending">
            {getTabLabel('pending', pendingOrders.length)}
          </TabsTrigger>
          <TabsTrigger value="finished">
            {getTabLabel('finished', finishedOrders.length)}
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            {getTabLabel('cancelled', cancelledOrders.length)}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <OrdersList
            orders={allOrders}
            stripe={stripe}
            searchTerm={searchTerm}
            emptyMessage="Você ainda não possui pedidos."
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <OrdersList
            orders={pendingOrders}
            stripe={stripe}
            searchTerm={searchTerm}
            emptyMessage="Nenhum pedido pendente encontrado."
          />
        </TabsContent>

        <TabsContent value="finished" className="mt-6">
          <OrdersList
            orders={finishedOrders}
            stripe={stripe}
            searchTerm={searchTerm}
            emptyMessage="Nenhum pedido finalizado encontrado."
          />
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <OrdersList
            orders={cancelledOrders}
            stripe={stripe}
            searchTerm={searchTerm}
            emptyMessage="Nenhum pedido cancelado encontrado."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
