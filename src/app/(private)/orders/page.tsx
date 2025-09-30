'use client'
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { OrderService } from "../../../services/order-service"

export default function OrdersPage() {
  const { data: session } = useSession()
  const { data: orders } = useQuery({
    queryKey: ['Orders'],
    queryFn: () => OrderService.getManyByUserId(session?.user?.id || ''),
  })
  const formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }
  const formattedAmount = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount)
  }
  const defineStatusColor = (status: string) => {
    if (status === 'pending') return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-800' }
    if (status === 'accepted') return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-800' }
    if (status === 'rejected') return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-800' }
    return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-800' }
  }
  return (
    <div className="flex flex-col gap-4 m-4">
      <h1 className="text-2xl font-bold text-primary">Pedidos</h1>
      <div className="flex items-center gap-2">
        <Input placeholder="Buscar pedido" />
        <Button>Buscar</Button>
      </div>
      <div className="gap-4 grid grid-cols-4">
        {orders?.map((order) => {
          const { bg, text, border } = defineStatusColor(order.status.toLowerCase())
          return (
            <Card className={`shadow-none p-2 border ${border} transition-colors cursor-pointer w-full min-w-[300px] ${bg}`} key={order.id}>
              <CardHeader>
                <CardTitle className={`${text}`}>{formattedAmount(order.amount)}</CardTitle>
                <CardDescription className={`${text}`}>{order.status}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className={`${text} text-sm font-bold`}>Vendedor</p>
                  <p className={`${text} text-sm`}>{order.seller.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className={`${text} text-sm font-bold`}>Enviado em</p>
                  <p className={`${text} text-sm`}>{formattedDate(new Date(order.createdAt).toISOString())}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}