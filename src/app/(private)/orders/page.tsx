'use client'
import { loadStripe } from '@stripe/stripe-js'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import {
  OrdersHeader,
  OrdersTabs,
  type OrderStatus,
} from '../../../components/routes/orders'
import { OrderService } from '../../../services/order-service'

export default function OrdersPage() {
  const { data: session } = useSession()
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<OrderStatus>('all')

  // Garantir que temos um ID de usuário válido
  const userId = (session?.user as any)?.id || session?.user?.email || ''

  // Buscar todos os pedidos do usuário
  const { data: orders, refetch } = useQuery({
    queryKey: ['Orders', userId],
    queryFn: () => {
      if (!userId) return []
      return OrderService.getManyByUserId(userId)
    },
    enabled: !!userId,
  })

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleTabChange = (tab: OrderStatus) => {
    setActiveTab(tab)
  }

  return (
    <div className="container py-8">
      <div className="m-4 flex flex-col gap-6">
        <OrdersHeader />
        <OrdersTabs
          orders={orders || []}
          stripe={stripe}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  )
}
