import { BalanceTransaction } from "../../../services/wallet-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { TransactionsList } from "./transactions-list"
import { WalletSearch } from "./wallet-search"

export type TransactionStatus = 'all' | 'available' | 'pending'

interface WalletTabsProps {
  transactions: BalanceTransaction[]
  searchTerm: string
  onSearchChange: (value: string) => void
  activeTab: TransactionStatus
  onTabChange: (tab: TransactionStatus) => void
}

export function WalletTabs({
  transactions,
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange
}: WalletTabsProps) {

  const filteredTransactions = transactions?.filter(transaction => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)

    return matchesSearch
  }) || []

  const allTransactions = filteredTransactions
  const availableTransactions = filteredTransactions.filter(t => t.status === 'available')
  const pendingTransactions = filteredTransactions.filter(t => t.status === 'pending')

  const getTabLabel = (status: TransactionStatus, count: number) => {
    const labels = {
      all: 'Todas',
      available: 'Disponíveis',
      pending: 'Pendentes'
    }
    return `${labels[status]} (${count})`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <WalletSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </div>

      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as TransactionStatus)}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">
            {getTabLabel('all', allTransactions.length)}
          </TabsTrigger>
          <TabsTrigger value="available">
            {getTabLabel('available', availableTransactions.length)}
          </TabsTrigger>
          <TabsTrigger value="pending">
            {getTabLabel('pending', pendingTransactions.length)}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <TransactionsList
            transactions={allTransactions}
            searchTerm={searchTerm}
            emptyMessage="Você ainda não possui transações."
          />
        </TabsContent>

        <TabsContent value="available" className="mt-6">
          <TransactionsList
            transactions={availableTransactions}
            searchTerm={searchTerm}
            emptyMessage="Nenhuma transação disponível encontrada."
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <TransactionsList
            transactions={pendingTransactions}
            searchTerm={searchTerm}
            emptyMessage="Nenhuma transação pendente encontrada."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
