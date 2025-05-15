import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowRight,
  Package,
  Users,
  MessageSquare,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Gestão Inteligente de Resíduos
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Simplifique a gestão de resíduos da sua empresa com nossa
              plataforma. Agende coletas, acompanhe métricas e contribua para um
              futuro mais sustentável.
            </p>
            <div className="flex gap-4">
              <Link href="/register">
                <Button size="lg">
                  Começar Agora
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="lg">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Package className="size-10 text-primary" />
                <CardTitle>Gestão de Produtos</CardTitle>
                <CardDescription>
                  Controle seu inventário de resíduos de forma eficiente
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="size-10 text-primary" />
                <CardTitle>Colaboração</CardTitle>
                <CardDescription>
                  Conecte-se com outros usuários e empresas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="size-10 text-primary" />
                <CardTitle>Comunicação</CardTitle>
                <CardDescription>
                  Mantenha-se informado sobre suas coletas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="size-10 text-primary" />
                <CardTitle>Métricas</CardTitle>
                <CardDescription>
                  Acompanhe o desempenho da sua gestão
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Colet. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
