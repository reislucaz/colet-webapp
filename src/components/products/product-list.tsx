/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/classnames-order */
'use client'

import { Product } from '@/@types/product';
import { ProductItem } from './product-item';

export function ProductList({ data }: { data: Product[] }) {
  return data.length ? (
    <div className="w-full grid items-start lg:grid-cols-4 xl:grid-cols-5 gap-3 md:grid-cols-3 grid-cols-1 justify-center">
      {data.map((item) => {
        return (
          <ProductItem item={item} key={item.id}/>
        )
      })}
    </div>
  ) : (
    <p className="text-center">No products found</p>
  )
}
