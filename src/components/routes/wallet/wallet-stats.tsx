import { BarChartIcon, CheckCircleIcon, ClockIcon, CoinsIcon } from "lucide-react"
import { WalletData } from "../../../services/wallet-service"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"

interface WalletStatsProps {
  walletData: WalletData
}

export function WalletStats({ walletData }: WalletStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount / 100) // Convertendo centavos para reais
  }

  const statusConfig = [{
    label: 'Saldo Total',
    icon: <CoinsIcon className="text-green-600" />,
    color: 'text-green-600'
  }, {
    label: 'Disponível',
    icon: <CheckCircleIcon className="text-blue-600" />,
    color: 'text-blue-600'
  }, {
    label: 'Pendente',
    icon: <ClockIcon className="text-yellow-600" />,
    color: 'text-yellow-600'
  }, {
    label: 'Total em Taxas',
    icon: <BarChartIcon className="text-red-600" />,
    color: 'text-red-600'
  }]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statusConfig.map((status) => (
        <Card key={status.label} className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{status.label}</CardTitle>
            <span className="text-2xl">{status.icon}</span>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${status.color}`}>
              {formatCurrency(walletData.balance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Saldo atual da conta
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
