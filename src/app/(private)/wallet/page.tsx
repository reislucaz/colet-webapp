'use client'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'
import {
  WalletChart,
  WalletHeader,
  WalletStats,
  WalletTabs,
  type TransactionStatus,
} from '../../../components/routes/wallet'
import {
  WalletService,
  type WalletStats as WalletStatsType,
} from '../../../services/wallet-service'
import Loading from '../loading'

export default function WalletPage() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<TransactionStatus>('all')

  // Garantir que temos um ID de usuário válido
  const userId = (session?.user as any)?.id || session?.user?.email || ''

  // Buscar dados das transações
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['WalletTransactions', userId],
    queryFn: () => WalletService.getTransactions(),
    enabled: !!userId,
  })

  // Buscar dados do saldo
  const { data: balance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ['WalletBalance', userId],
    queryFn: () => WalletService.getBalance(),
    enabled: !!userId,
  })

  const isLoading = isLoadingTransactions || isLoadingBalance

  // Processar dados para calcular estatísticas
  const processedWalletData = useMemo(() => {
    if (!transactions?.length || !balance) {
      return {
        balance: 0,
        totalSales: 0,
        totalPurchases: 0,
        pendingAmount: 0,
        availableAmount: 0,
        totalFees: 0,
      }
    }

    // Calcular valores do saldo
    const availableAmount = balance.available.reduce(
      (sum, item) => sum + item.amount,
      0,
    )
    const pendingAmount = balance.pending.reduce(
      (sum, item) => sum + item.amount,
      0,
    )
    const totalBalance = availableAmount + pendingAmount

    // Calcular estatísticas das transações
    const totalSales = transactions.reduce((sum, t) => sum + t.amount, 0)
    const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0)

    return {
      balance: totalBalance,
      totalSales,
      totalPurchases: 0, // Não aplicável para transações do Stripe
      pendingAmount,
      availableAmount,
      totalFees,
    }
  }, [transactions, balance])

  // Processar dados mensais para o gráfico
  const monthlyData = useMemo(() => {
    if (!transactions?.length) return []

    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ]
    const currentDate = new Date()
    const last6Months = []

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1,
      )
      const monthName = months[date.getMonth()]
      const year = date.getFullYear()

      // Filtrar transações do mês
      const monthTransactions = transactions.filter((t) => {
        const transactionDate = new Date(t.created * 1000)
        return (
          transactionDate.getFullYear() === year &&
          transactionDate.getMonth() === date.getMonth()
        )
      })

      const sales = monthTransactions.reduce((sum, t) => sum + t.amount, 0)
      const fees = monthTransactions.reduce((sum, t) => sum + t.fee, 0)
      const net = monthTransactions.reduce((sum, t) => sum + t.net, 0)

      last6Months.push({
        month: monthName,
        sales,
        fees,
        net,
      })
    }

    return last6Months
  }, [transactions])

  const processedWalletStats: WalletStatsType = {
    wallet: processedWalletData,
    transactions: transactions || [],
    monthlyData,
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleTabChange = (tab: TransactionStatus) => {
    setActiveTab(tab)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container py-8">
      <div className="m-4 flex flex-col gap-6">
        {/* Header */}
        <WalletHeader />

        {/* Estatísticas */}
        <WalletStats walletData={processedWalletData} />

        {/* Gráfico */}
        <WalletChart walletStats={processedWalletStats} />

        {/* Tabs com Filtros e Lista de Transações */}
        <WalletTabs
          transactions={transactions || []}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  )
}
