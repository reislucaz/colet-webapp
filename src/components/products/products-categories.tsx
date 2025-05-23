'use client'
/* eslint-disable tailwindcss/classnames-order */
import { Icon } from '@/shared/icon'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { Category } from '../../@types/category'
import { Card, CardContent } from '../ui/card'

export function ProductsCategories({ categories }: { categories: Category[] }) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div className="flex w-full items-center justify-center gap-5">
        {categories.map((item, index) => {
          return (
            <motion.div animate={{ opacity: [0, 1], transition: { duration: 0.5, delay: index * 0.05, ease: 'easeInOut' } }} layout>
              <Link href={`/products?category=${item.id}`} key={index}>
                <Card className='rounded-full group cursor-pointer shadow-none hover:bg-primary hover:text-white transition-all ease-out'>
                  <CardContent className='p-0 flex gap-2 justify-center items-center bg-transparent'>
                    <Icon
                      name={item.iconKey}
                      className="group-hover:scale-110 transition-all ease-in"
                    />
                    <p className="text-sm whitespace-nowrap">{item.name}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
