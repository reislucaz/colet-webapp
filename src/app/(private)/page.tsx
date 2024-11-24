import { ProductCarousel } from '@/components/products/product-carousel'
import { ProductList } from '@/components/products/product-list'
import { ProductsCategories } from '@/components/products/products-categories'

export default function Home() {
  const products = Array.from({ length: 3 }).map((_, index) => {
    return {
      name: `item-${index}`,
    }
  })

  const productsList = Array.from({ length: 12 }).map((_, index) => {
    return {
      name: `item-${index}`,
    }
  })

  const productsCategories = Array.from({ length: 4 }).map(() => {
    return {
      name: `category`,
      value: 'metal',
    }
  })

  return (
    <div className="flex flex-col gap-5 gap-x-0 px-0">
      <h2 className="text-3xl">Produtos em destaque</h2>
      <div className="flex w-full items-center justify-center">
        <ProductCarousel products={products} />
      </div>
      <h2 className="text-3xl">Categorias</h2>
      <div className="flex flex-col items-center justify-center">
        <ProductsCategories categories={productsCategories} />
      </div>
      <h2 className="text-3xl">Produtos</h2>
      <ProductList data={productsList} />
    </div>
  )
}
