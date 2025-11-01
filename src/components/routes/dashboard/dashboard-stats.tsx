import {
  CoinsIcon,
  PackageIcon,
  ShoppingBagIcon,
  ClockIcon,
} from 'lucide-react'
import { formatCurrency } from '../../../utils/format-currency'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

interface DashboardStatsProps {
  totalProducts: number
  totalOrders: number
  totalSales: number
  pendingOrders: number
}

export function DashboardStats({
  totalProducts,
  totalOrders,
  totalSales,
  pendingOrders,
}: DashboardStatsProps) {
  const statsConfig = [
    {
      label: 'Total de Vendas',
      value: formatCurrency(totalSales),
      icon: CoinsIcon,
      color: 'text-green-600 dark:text-green-400',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      description: 'Valor total acumulado',
    },
    {
      label: 'Total de Pedidos',
      value: totalOrders.toString(),
      icon: ShoppingBagIcon,
      color: 'text-blue-600 dark:text-blue-400',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      description: 'Pedidos realizados',
    },
    {
      label: 'Produtos Vendidos',
      value: totalProducts.toString(),
      icon: PackageIcon,
      color: 'text-purple-600 dark:text-purple-400',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      description: 'Produtos diferentes',
    },
    {
      label: 'Pedidos Pendentes',
      value: pendingOrders.toString(),
      icon: ClockIcon,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgGradient: 'from-yellow-500/10 to-orange-500/10',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
      description: 'Aguardando pagamento',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat, index) => (
        <div
          key={stat.label}
          className="group"
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
          }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:from-gray-900 dark:to-gray-800/50">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </CardTitle>
              <div
                className={`${stat.iconBg} rounded-full p-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}
              >
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
            </CardHeader>

            <CardContent className="relative">
              <div
                className={`text-2xl font-bold transition-colors ${stat.color}`}
              >
                {stat.value}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>

              <div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
            </CardContent>
          </Card>
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
