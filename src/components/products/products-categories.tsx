'use client'
/* eslint-disable tailwindcss/classnames-order */
import { Icon } from '@/shared/icon'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { Category } from '../../@types/category'

export function ProductsCategories({ categories }: { categories: Category[] }) {
  return (
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
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
              className="group p-6 bg-gray-50 rounded-2xl hover:bg-gradient-to-br hover:from-textPrimary/5 hover:to-primary/5 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-primary/5 hover:shadow-lg text-center"
              layout
            >
              <Link href={`/products?category=${item.id}`} key={index}>
                <div className="size-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Icon
                    name={item.iconKey}
                    className="size-8 text-gray-600 group-hover:text-primary"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
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
