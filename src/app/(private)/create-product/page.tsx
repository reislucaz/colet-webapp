import { ProductForm } from '@/components/routes/create-product/product-form'
import { FormSkeleton } from '@/components/ui/form-skeleton'
import { Suspense } from 'react'

export default function CreateProductPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Criar Produto</h1>
        <p className="mt-2 text-muted-foreground">
          Preencha os dados do seu produto ou serviço
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <Suspense fallback={<FormSkeleton />}>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <ProductForm />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
