import { BalanceTransaction } from "../../../services/wallet-service"
import { Card } from "../../ui/card"
import { TransactionCard } from "./transaction-card"

interface TransactionsListProps {
  transactions: BalanceTransaction[]
  searchTerm: string
  emptyMessage?: string
}

export function TransactionsList({
  transactions,
  searchTerm,
  emptyMessage = "Nenhuma transação encontrada."
}: TransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          {searchTerm
            ? 'Nenhuma transação encontrada com os filtros aplicados.'
            : emptyMessage
          }
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </div>
  )
}
