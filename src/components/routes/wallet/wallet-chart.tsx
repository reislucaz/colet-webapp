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

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
  }>
  label?: string
}

type ChartType = 'line' | 'bar'
type ChartPeriod = '7d' | '30d' | '90d' | '1y'

const chartPeriods: ChartPeriod[] = ['7d', '30d', '90d', '1y']
const chartHeight = 350
const chartColors = {
  sales: '#22c55e',
  fees: '#ef4444',
  net: '#3b82f6',
}
const axisStroke = '#888888'
const barRadius: [number, number, number, number] = [8, 8, 0, 0]
const lineStrokeWidth = 2
const dotRadius = 4
const activeDotRadius = 6

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <p className="mb-2 font-semibold text-gray-900 dark:text-white">
        Mês: {label}
      </p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color }} className="text-sm">
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  )
}

const ChartTypeToggle = ({
  chartType,
  onTypeChange,
}: {
  chartType: ChartType
  onTypeChange: (type: ChartType) => void
}) => (
  <div className="flex gap-1 rounded-lg border border-gray-200 p-1 dark:border-gray-700">
    <Button
      variant={chartType === 'line' ? 'default' : 'ghost'}
      size="sm"
      onClick={() => onTypeChange('line')}
      className="transition-all duration-300"
    >
      <TrendingUp className="mr-1 size-4" />
      Linha
    </Button>
    <Button
      variant={chartType === 'bar' ? 'default' : 'ghost'}
      size="sm"
      onClick={() => onTypeChange('bar')}
      className="transition-all duration-300"
    >
      <BarChart3 className="mr-1 size-4" />
      Barras
    </Button>
  </div>
)

const PeriodSelector = ({
  selectedPeriod,
  onPeriodChange,
}: {
  selectedPeriod: ChartPeriod
  onPeriodChange: (period: ChartPeriod) => void
}) => (
  <div className="flex gap-1 rounded-lg border border-gray-200 p-1 dark:border-gray-700">
    {chartPeriods.map((period) => (
      <Button
        key={period}
        variant={selectedPeriod === period ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onPeriodChange(period)}
        className="transition-all duration-300"
      >
        {period}
      </Button>
    ))}
  </div>
)

export function WalletChart({ walletStats }: WalletChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line')
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>('30d')

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
            <ChartTypeToggle
              chartType={chartType}
              onTypeChange={setChartType}
            />
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <ResponsiveContainer width="100%" height={chartHeight}>
          {chartType === 'line' ? (
            <LineChart data={walletStats.monthlyData}>
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis
                stroke={axisStroke}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Vendas"
                stroke={chartColors.sales}
                strokeWidth={lineStrokeWidth}
                dot={{ fill: chartColors.sales, r: dotRadius }}
                activeDot={{ r: activeDotRadius }}
              />
              <Line
                type="monotone"
                dataKey="fees"
                name="Taxas"
                stroke={chartColors.fees}
                strokeWidth={lineStrokeWidth}
                dot={{ fill: chartColors.fees, r: dotRadius }}
                activeDot={{ r: activeDotRadius }}
              />
              <Line
                type="monotone"
                dataKey="net"
                name="Líquido"
                stroke={chartColors.net}
                strokeWidth={lineStrokeWidth}
                dot={{ fill: chartColors.net, r: dotRadius }}
                activeDot={{ r: activeDotRadius }}
              />
            </LineChart>
          ) : (
            <BarChart data={walletStats.monthlyData}>
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis
                stroke={axisStroke}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="sales"
                name="Vendas"
                fill={chartColors.sales}
                radius={barRadius}
              />
              <Bar
                dataKey="fees"
                name="Taxas"
                fill={chartColors.fees}
                radius={barRadius}
              />
              <Bar
                dataKey="net"
                name="Líquido"
                fill={chartColors.net}
                radius={barRadius}
              />
            </BarChart>
          )}
        </ResponsiveContainer>

        <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
      </CardContent>
    </Card>
  )
}
