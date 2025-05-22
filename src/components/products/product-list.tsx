/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/classnames-order */
'use client'

import { Product } from '@/@types/product';
import { ProductItem } from './product-item';

export function ProductList({ data }: { data: Product[] }) {
  return data.length ? (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => {
        return (
          <ProductItem product={item} key={item.id}/>
        )
      })}
    </div>
  ) : (
    <p className="text-center">No products found</p>
  )
}
