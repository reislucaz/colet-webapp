/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/classnames-order */
'use client'

import { Product } from '@/@types/product';
import * as motion from 'motion/react-client';
import { ProductItem } from './product-item';

export function ProductList({ data }: { data: Product[] }) {
  return data.length ? (
    <motion.div initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      layout
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => {
        return (
          <ProductItem product={item} key={item.id} idx={index} />
        )
      })}
    </motion.div>
  ) : (
    <p className="text-center">No products found</p>
  )
}
