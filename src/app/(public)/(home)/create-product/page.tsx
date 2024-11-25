import { ProductForm } from '@/components/routes/create-product/product-form'

export default async function CreateProductPage() {
  return (
    <div className="flex flex-col gap-5">
      <p className="border-l-4 border-l-primary pl-2 text-3xl">
        Adicionar anúncio
      </p>
      <ProductForm />
    </div>
  )
}
