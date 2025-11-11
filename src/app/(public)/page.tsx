'use client'
import { Category } from '@/@types/category'
import { Product } from '@/@types/product'
import { CategoriesSession } from '@/components/routes/home/categories-session'
import { HomeFooter } from '@/components/routes/home/footer'
import { ProductsSession } from '@/components/routes/home/products-session'
import { authOptions } from '@/lib/auth/auth-options'
import { coletApi } from '@/services/axios'
import { getServerSession } from 'next-auth'
import { Hero } from '../../components/hero'
import { HowItWorks } from '../../components/how-it-works'
import { useQuery } from '@tanstack/react-query'
import { getSession, useSession } from 'next-auth/react'
import { productsQueryKey } from '@/constants/query-key/products-query-key'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export default function Home() {
  const { data: categories } = useQuery({
    queryKey: [],
    queryFn: async ()=> (await coletApi.get<PaginatedResponse<Category>>('/categories')).data
  })
    

  const isAuthenticated =  useSession().data?.user

  if (isAuthenticated) {
     const { data: products } = useQuery({
    queryKey: [productsQueryKey.LIST_PRODUCTS],
    queryFn: async ()=> ((await coletApi.get<PaginatedResponse<Product>>('/products')).data)
  })
    return (
      <div className="flex flex-col">
        <main className="flex flex-col items-center justify-center gap-5 py-4">
          {products?.total && products?.total > 0 && <ProductsSession products={products.data} />}
          {categories?.total && categories.total > 0 && (
            <CategoriesSession categories={categories.data} />
          )}
          <HomeFooter />
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Hero />
      <HowItWorks />
      <main className="flex flex-col items-center justify-center gap-5 py-4">
        {categories?.total && categories?.total > 0 && (
          <CategoriesSession categories={categories.data} />
        )}
        <HomeFooter />
      </main>
    </div>
  )
}
