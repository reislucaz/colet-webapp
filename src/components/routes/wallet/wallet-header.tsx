import { Wallet } from 'lucide-react'

export function WalletHeader() {
  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-primary p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex items-center gap-4">
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Wallet className="size-8 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
              Minha Carteira
            </h1>
            <p className="mt-1 text-sm text-white/90">
              Acompanhe seu saldo, transações e histórico financeiro
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 size-32 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  )
}
