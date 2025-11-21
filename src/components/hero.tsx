'use client'
import { ArrowRight, Leaf, Recycle } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-500/10 via-primary/5 to-blue-500/10 py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="absolute left-10 top-20 size-32 animate-pulse rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 size-40 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />

      <div className="container relative z-10 px-6 text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 shadow-lg backdrop-blur-sm"
          style={{ animation: 'fadeInUp 0.5s ease-out' }}
        >
          <Recycle className="size-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Plataforma de Reciclagem Sustentável
          </span>
        </div>

        <h1
          className="mb-6 bg-gradient-to-r from-green-600 via-primary to-blue-600 bg-clip-text text-6xl font-bold leading-tight text-transparent md:text-7xl"
          style={{ animation: 'fadeInUp 0.5s ease-out 0.1s both' }}
        >
          Conectando pessoas e
          <br />
          movimentando reciclagem
        </h1>

        <p
          className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-400 md:text-2xl"
          style={{ animation: 'fadeInUp 0.5s ease-out 0.2s both' }}
        >
          A maior plataforma de compra e venda de materiais recicláveis do
          Brasil. Produtos sustentáveis, negócios seguros e impacto ambiental
          positivo.
        </p>

        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animation: 'fadeInUp 0.5s ease-out 0.3s both' }}
        >
          <Link href="/products">
            <Button
              size="lg"
              className="group rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-700 hover:shadow-2xl"
            >
              <Leaf className="mr-2 size-5 transition-transform group-hover:rotate-12" />
              Explorar Produtos
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-2 border-gray-300 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/5 dark:border-gray-700"
            >
              Ver Dashboard
            </Button>
          </Link>
        </div>

        <div
          className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400"
          style={{ animation: 'fadeInUp 0.5s ease-out 0.4s both' }}
        >
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500" />
            <span>100% Sustentável</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-blue-500" />
            <span>Negócios Seguros</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-purple-500" />
            <span>Impacto Positivo</span>
          </div>
        </div>
      </div>

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
    </section>
  )
}
