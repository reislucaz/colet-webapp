import { CheckCircle, Upload, Users } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      number: '01',
      title: 'Anuncie Grátis',
      description:
        'Crie sua conta e publique seu produto com fotos e descrição em poucos cliques.',
    },
    {
      icon: Users,
      number: '02',
      title: 'Conecte-se',
      description:
        'Receba mensagens de interessados e negocie diretamente pelo nosso chat seguro.',
    },
    {
      icon: CheckCircle,
      number: '03',
      title: 'Venda com Segurança',
      description:
        'Finalize a venda com nosso sistema de pagamento protegido e entrega garantida.',
    },
  ]

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-10">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Como funciona?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Vender nunca foi tão simples. Apenas 3 passos para começar
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.number}
                  className="mt-5 flex flex-col items-center justify-center gap-3 rounded-xl bg-background px-5 py-10 shadow-md"
                >
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-textPrimary to-primary p-5 text-background">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-center text-base text-gray-600">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
