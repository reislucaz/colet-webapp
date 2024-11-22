'use client'

import { Card, CardContent } from "../ui/card"

export function ProductList({ data }: { data: any[] }) {
  return <div className='grid grid-cols-4 gap-2'>
    {data.map((item, index) =>
      <Card key={index}>
        <CardContent>
          {item.name}
        </CardContent>
      </Card>
    )}
  </div>
}