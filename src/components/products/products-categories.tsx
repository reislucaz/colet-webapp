'use client'
import { Icon } from '@/shared/icon'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { Category } from '../../@types/category'

export function ProductsCategories({ categories }: { categories: Category[] }) {
  return (
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-2 items-center justify-center gap-6 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              animate={{
                opacity: [0, 1],
                transition: {
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: 'easeInOut',
                },
              }}
              className="group cursor-pointer rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center transition-all duration-300 hover:border-primary/5 hover:bg-gradient-to-br hover:from-textPrimary/5 hover:to-primary/5 hover:shadow-lg dark:border-gray-900 dark:bg-gray-950"
              layout
            >
              <Link href={`/products?category=${item.id}`} key={index}>
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-background shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Icon
                    name={item.iconKey}
                    className="size-8 text-gray-600 group-hover:text-primary dark:text-gray-300"
                  />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  {item.name}
                </h3>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </AnimatePresence>
  )
}
