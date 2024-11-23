/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/classnames-order */
'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader } from '../ui/card'

export function ProductList({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-6 gap-3">
      {data.map((item, index) => (
        <Card key={index} className="cursor-pointer p-0 group bg-accent">
          <CardHeader className="p-0 h-[200px] overflow-hidden rounded-t-md">
            <Image
              width={500}
              height={50}
              className="size-full object-cover group-hover:scale-125 transition-all ease-in"
              src="https://plus.unsplash.com/premium_vector-1728388670725-b1194018b52b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxpbGx1c3RyYXRpb25zLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </CardHeader>
          <CardContent className="flex flex-col justify-around p-5 gap-3">
            <h3 className="text-2xl">Price</h3>
            <p className="text-base">{item.name}</p>
            <div>
              <p className="text-sm">Localization</p>
              <p className="text-sm">Date</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
