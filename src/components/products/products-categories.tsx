'use client'
/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Icon } from '@/shared/icon'

export function ProductsCategories({ categories }: { categories: any[] }) {
  return (
    <div className="flex w-full items-center justify-start gap-5">
      {categories.map((item, index) => {
        return (
          <Link href={`/products?category=${item.id}`} key={index}>
            <Card className="group cursor-pointer aspect-square bg-transparent shadow-none flex-col p-0 flex gap-2 justify-center items-center">
              <CardHeader className="rounded-full group-hover:bg-primary group-hover:text-background transition-all duration-75 bg-accent p-5 flex w-fit justify-center items-center">
                <Icon
                  name={item.iconKey}
                  className="group-hover:scale-125 transition-all ease-in"
                />
              </CardHeader>
              <CardContent>
                <p className="text-sm">{item.name}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
