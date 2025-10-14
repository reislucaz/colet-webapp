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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-3 shadow-lg">
          <p className="font-medium">{`Mês: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Histórico Financeiro</CardTitle>
            <CardDescription>
              Evolução das suas vendas, taxas e saldo líquido ao longo do tempo
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Button
                variant={chartType === 'line' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('line')}
              >
                Linha
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('bar')}
              >
                Barras
              </Button>
            </div>
            <div className="flex gap-1">
              {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'line' ? (
            <LineChart data={walletStats.monthlyData}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Vendas"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="fees"
                stroke="#ef4444"
                strokeWidth={3}
                name="Taxas"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#10b981"
                strokeWidth={3}
                name="Saldo Líquido"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={walletStats.monthlyData}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Vendas" />
              <Bar dataKey="fees" fill="#ef4444" name="Taxas" />
              <Bar dataKey="net" fill="#10b981" name="Saldo Líquido" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
