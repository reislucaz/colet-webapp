import { Search } from 'lucide-react'
import { Input } from '../../ui/input'

interface WalletSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function WalletSearch({
  searchTerm,
  onSearchChange,
}: WalletSearchProps) {
  return (
    <div className="relative w-full flex-1">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Buscar por ID, tipo ou valor da transação..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="py-6 pl-10"
      />
    </div>
  )
}
