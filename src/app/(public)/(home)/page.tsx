import { ProductList } from '@/components/products/product-list'
import { ProductsCategories } from '@/components/products/products-categories'

export default async function Home() {
  const fetchCategories = fetch(process.env.NEXT_PUBLIC_API_URL + '/categories')

  const fetchProducts = fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
    cache: 'no-cache',
  })

  const [responseCategories, responseProducts] = await Promise.all([
    fetchCategories,
    fetchProducts,
  ])

  const [productsCategories, productsList] = await Promise.all([
    responseCategories.json(),
    responseProducts.json(),
  ])

  return (
    <div className="flex flex-col gap-6 gap-x-0 px-0">
      {productsCategories.total ? (
        <>
          <h2 className="text-3xl">Categorias</h2>
          <ProductsCategories categories={productsCategories.data} />
        </>
      ) : null}
      {productsList.total ? (
        <>
          <h2 className="text-3xl">Anúncios</h2>
          <ProductList data={productsList.data} />
        </>
      ) : null}
    </div>
  )
}
