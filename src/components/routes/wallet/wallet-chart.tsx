import { BarChart3, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { WalletStats } from '../../../services/wallet-service'
import { formatCurrency } from '../../../utils/format-currency'
import { Button } from '../../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card'

interface WalletChartProps {
  walletStats: WalletStats
}

type ChartType = 'line' | 'bar'
type ChartPeriod = '7d' | '30d' | '90d' | '1y'

export function WalletChart({ walletStats }: WalletChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line')
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>('30d')

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-2 font-semibold text-gray-900 dark:text-white">{`Mês: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:from-gray-900 dark:to-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardHeader className="relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
              <TrendingUp className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Histórico Financeiro
              </CardTitle>
              <CardDescription>
                Evolução das suas vendas, taxas e saldo líquido ao longo do
                tempo
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex gap-1 rounded-lg border border-gray-200 p-1 dark:border-gray-700">
              <Button
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('line')}
                className="transition-all duration-300"
              >
                <TrendingUp className="mr-1 size-4" />
                Linha
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('bar')}
                className="transition-all duration-300"
              >
                <BarChart3 className="mr-1 size-4" />
                Barras
              </Button>
            </div>

            <div className="flex gap-1 rounded-lg border border-gray-200 p-1 dark:border-gray-700">
              {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="transition-all duration-300"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <ResponsiveContainer width="100%" height={350}>
          {chartType === 'line' ? (
            <LineChart data={walletStats.monthlyData}>
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis
                stroke="#888888"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Vendas"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="fees"
                name="Taxas"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="net"
                name="Líquido"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <BarChart data={walletStats.monthlyData}>
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis
                stroke="#888888"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="sales"
                name="Vendas"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="fees"
                name="Taxas"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="net"
                name="Líquido"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>

        <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
      </CardContent>
    </Card>
  )
}
