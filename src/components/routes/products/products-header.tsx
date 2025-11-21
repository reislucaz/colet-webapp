import { Package } from 'lucide-react'

export function ProductsHeader() {
  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary/80 p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex items-center gap-4">
          <div className="rounded-full bg-primary-foreground/20 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Package className="size-8 text-primary-foreground" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-primary-foreground transition-transform duration-300 group-hover:translate-x-1">
              Meus Produtos
            </h1>
            <p className="mt-1 text-sm text-primary-foreground/90">
              Gerencie seus produtos e resíduos recicláveis
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 size-32 rounded-full bg-primary-foreground/10 blur-3xl" />
      </div>
    </div>
  )
}
