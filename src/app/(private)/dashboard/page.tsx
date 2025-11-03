'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import {
  DashboardHeader,
  DashboardStats,
  RecentOrders,
  TopProducts,
} from '../../../components/routes/dashboard'
import { DashboardService } from '../../../services/dashboard-service'
import Loading from '../loading'

const getUserId = (session: any) => {
  return session?.user?.id || session?.user?.email || ''
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const userId = getUserId(session)

  const { data: stats, isLoading } = useQuery({
    queryKey: ['DashboardStats', userId],
    queryFn: () => DashboardService.getStats(),
    enabled: !!userId,
  })

  if (isLoading) {
    return <Loading />
  }

  if (!stats) {
    return (
      <div className="container py-8">
        <DashboardHeader />
        <div className="mt-8 text-center text-muted-foreground">
          Não foi possível carregar os dados do dashboard
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="m-4 flex flex-col gap-6">
        <DashboardHeader />

        <DashboardStats
          totalProducts={stats.totalProducts}
          totalOrders={stats.totalOrders}
          totalSales={stats.totalSales}
          pendingOrders={stats.pendingOrders}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentOrders orders={stats.recentOrders} />
          <TopProducts products={stats.topProducts} />
        </div>
      </div>
    </div>
  )
}
