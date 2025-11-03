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
  type Balance,
  type BalanceTransaction,
  type WalletStats as WalletStatsType,
} from '../../../services/wallet-service'
import Loading from '../loading'

const monthsLabels = [
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

const monthsToDisplay = 6
const initialWalletData = {
  balance: 0,
  totalSales: 0,
  totalPurchases: 0,
  pendingAmount: 0,
  availableAmount: 0,
  totalFees: 0,
}

const calculateBalanceAmounts = (balance: Balance) => {
  const availableAmount = balance.available.reduce(
    (sum, item) => sum + item.amount,
    0,
  )
  const pendingAmount = balance.pending.reduce(
    (sum, item) => sum + item.amount,
    0,
  )
  const totalBalance = availableAmount + pendingAmount

  return { availableAmount, pendingAmount, totalBalance }
}

const calculateTransactionTotals = (transactions: BalanceTransaction[]) => {
  const totalSales = transactions.reduce((sum, t) => sum + t.amount, 0)
  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0)

  return { totalSales, totalFees }
}

const filterTransactionsByMonth = (
  transactions: BalanceTransaction[],
  year: number,
  month: number,
) => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.created * 1000)
    return (
      transactionDate.getFullYear() === year &&
      transactionDate.getMonth() === month
    )
  })
}

const calculateMonthlyTotals = (transactions: BalanceTransaction[]) => {
  const sales = transactions.reduce((sum, t) => sum + t.amount, 0)
  const fees = transactions.reduce((sum, t) => sum + t.fee, 0)
  const net = transactions.reduce((sum, t) => sum + t.net, 0)

  return { sales, fees, net }
}

const generateMonthlyData = (transactions: BalanceTransaction[]) => {
  if (!transactions?.length) return []

  const currentDate = new Date()
  const monthlyData = []

  for (let i = monthsToDisplay - 1; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    )
    const monthName = monthsLabels[date.getMonth()]
    const year = date.getFullYear()
    const month = date.getMonth()

    const monthTransactions = filterTransactionsByMonth(
      transactions,
      year,
      month,
    )
    const totals = calculateMonthlyTotals(monthTransactions)

    monthlyData.push({
      month: monthName,
      ...totals,
    })
  }

  return monthlyData
}

const processWalletData = (
  transactions: BalanceTransaction[] | undefined,
  balance: Balance | undefined,
) => {
  if (!transactions?.length || !balance) {
    return initialWalletData
  }

  const { availableAmount, pendingAmount, totalBalance } =
    calculateBalanceAmounts(balance)
  const { totalSales, totalFees } = calculateTransactionTotals(transactions)

  return {
    balance: totalBalance,
    totalSales,
    totalPurchases: 0,
    pendingAmount,
    availableAmount,
    totalFees,
  }
}

const getUserId = (session: any) => {
  return session?.user?.id || session?.user?.email || ''
}

export default function WalletPage() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<TransactionStatus>('all')

  const userId = getUserId(session)

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['WalletTransactions', userId],
    queryFn: () => WalletService.getTransactions(),
    enabled: !!userId,
  })

  const { data: balance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ['WalletBalance', userId],
    queryFn: () => WalletService.getBalance(),
    enabled: !!userId,
  })

  const isLoading = isLoadingTransactions || isLoadingBalance

  const processedWalletData = useMemo(
    () => processWalletData(transactions, balance),
    [transactions, balance],
  )

  const monthlyData = useMemo(
    () => generateMonthlyData(transactions || []),
    [transactions],
  )

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
        <WalletHeader />
        <WalletStats walletData={processedWalletData} />
        <WalletChart walletStats={processedWalletStats} />
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
