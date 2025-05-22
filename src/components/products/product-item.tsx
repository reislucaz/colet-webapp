import { timeAgo } from '@/utils/time-ago'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Product } from '@/@types/product'
import Image from 'next/image'
import Link from 'next/link'

export function ProductItem({ item }: { item: Product }) {
  const description =
    item.description.length > 40
      ? `${item.description.slice(0, 40)}...`
      : item.description
  const formattedPrice = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(item.price)

  return (
    <Link href={`/products/${item.id}`} key={item.id}>
      <Card className="group max-h-96 cursor-pointer bg-accent p-0">
        <CardHeader className="max-h-40 overflow-hidden rounded-t-md p-0">
          <Image
            width={500}
            height={50}
            className="object-contain transition-all ease-in group-hover:scale-125"
            src="https://plus.unsplash.com/premium_vector-1728388670725-b1194018b52b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxpbGx1c3RyYXRpb25zLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </CardHeader>
        <CardContent className="flex h-48 flex-col justify-between gap-3 p-5">
          <h3 className="text-xl text-gray-900">{formattedPrice}</h3>
          <p className="text-sm text-gray-800">{description}</p>
          <div className="flex flex-col justify-center gap-1">
            <p className="text-xs text-gray-500">{`${item.neighborhood}, ${item.city}/${item.state}`}</p>
            <p className="text-xs text-gray-500">
              {timeAgo(new Date(item.createdAt))}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
