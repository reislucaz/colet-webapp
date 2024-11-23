/* eslint-disable tailwindcss/classnames-order */
import { Card, CardContent, CardHeader } from '../ui/card'
import { HamIcon } from 'lucide-react'

export function ProductsCategories({ categories }: { categories: any[] }) {
  return (
    <div className="flex w-full items-center justify-start gap-5">
      {categories.map((item, index) => {
        return (
          <Card
            key={index}
            className="group cursor-pointer aspect-square bg-transparent shadow-none flex-col p-0 flex gap-2 justify-center items-center"
          >
            <CardHeader className="rounded-full bg-accent p-5 flex w-fit justify-center items-center">
              <HamIcon className="group-hover:scale-125 transition-all ease-in" />
            </CardHeader>
            <CardContent>
              <p className="text-sm">{item.name}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
