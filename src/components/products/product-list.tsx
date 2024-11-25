/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/classnames-order */
'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader } from '../ui/card'
import Link from 'next/link'
import { timeAgo } from '@/utils/time-ago';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';



export function ProductList({ data }: { data: any[] }) {
  return data.length ? (
    <div className="grid items-center lg:grid-cols-4 xl:grid-cols-6 gap-3 md:grid-cols-3 grid-cols-1">
      {data.map((item, index) => {
        const description = item.description.length > 59 ? `${item.description.slice(0, 59)}...` : item.description
        return (
          <Link href={`/products/${item.id}`} key={index}>
            <Card className="cursor-pointer p-0 group bg-accent">
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
                <h3 className="text-2xl">{item.name}</h3>
                <p className="text-base">{description}</p>
                <div>
                  <p className="text-sm">{`${item.neighborhood}, ${item.city}/${item.state}`}</p>
                  <p className="text-sm">{
                    timeAgo(new Date(item.createdAt))
                  }</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
      <Link href="/create-product">

        <Button variant="outline" className='flex items-center gap-2 rounded-full'>
          <Plus size={16} className='fill-primary' />
          Adicionar anúncio</Button>
      </Link>
    </div>
  ) : (
    <p className="text-center">No products found</p>
  )
}
