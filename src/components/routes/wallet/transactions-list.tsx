import { Receipt } from 'lucide-react'
import { BalanceTransaction } from '../../../services/wallet-service'
import { Card } from '../../ui/card'
import { TransactionCard } from './transaction-card'

interface TransactionsListProps {
  transactions: BalanceTransaction[]
  searchTerm: string
  emptyMessage?: string
}

export function TransactionsList({
  transactions,
  searchTerm,
  emptyMessage = 'Nenhuma transação encontrada.',
}: TransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 p-12 text-center shadow-lg dark:from-gray-900 dark:to-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex flex-col items-center gap-4">
          <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
            <Receipt className="size-12 text-gray-400 dark:text-gray-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {searchTerm
                ? 'Nenhum resultado encontrado'
                : 'Nenhuma transação ainda'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? 'Tente ajustar seus filtros de busca.'
                : emptyMessage}
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
          }}
        >
          <TransactionCard transaction={transaction} />
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
