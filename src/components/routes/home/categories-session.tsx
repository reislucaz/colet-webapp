import { Category } from '@/@types/category'
import { ProductsCategories } from '@/components/products/products-categories'

export function CategoriesSession({ categories }: { categories: Category[] }) {
  return (
    <section className="container mt-8 ">
      <div className="mb-8 text-center">
        <h2 className="mb-4 bg-gradient-to-r from-green-600 via-primary to-blue-600 bg-clip-text text-4xl font-bold text-transparent">
          Categorias Populares
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Explore produtos por categoria
        </p>
      </div>
      <ProductsCategories categories={categories} />
    </section>
  )
}
