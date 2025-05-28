import { Button } from './ui/button'

export function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-indigo-50 to-textPrimary/5 py-20">
      <div className="container relative z-10 px-6 text-center">
        <h1 className="mb-6 text-6xl font-bold leading-tight text-gray-900 md:text-7xl">
          Colet: Conectando pessoas e movimentando reciclagem
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
          A maior plataforma de compra e venda de sobressalentes do Brasil.
          Vários produtos, negócios seguros e entrega garantida.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
          >
            Começar a usar
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-xl border-2 border-gray-300 px-8 py-6 text-lg transition-all duration-300 hover:border-primary"
          >
            Explorar Produtos
          </Button>
        </div>
      </div>
    </section>
  )
}
