import { Search } from "lucide-react"
import { Input } from "../../ui/input"

interface WalletSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function WalletSearch({ searchTerm, onSearchChange }: WalletSearchProps) {
  return (
    <div className="relative flex-1 w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Buscar por ID, tipo ou valor da transação..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 py-6"
      />
    </div>
  )
}
