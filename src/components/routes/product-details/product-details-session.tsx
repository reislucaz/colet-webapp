import { Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { Product } from "../../../@types/product"
import { formattedDateFNS } from "../../../utils/format-date"
import { Card, CardContent } from "../../ui/card"

export function ProductDetailsSession({ product }: { product: Product }) {
  const currencyFormatter = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })
  return <div className="w-1/2 h-full gap-5 flex flex-col">
    {product.images.length > 0 && <Card className="size-full shadow-md">
      <CardContent>
        {product.images.map((image) => {
          return <Image key={image.id} alt={image.key} src={image.key} />
        })}
      </CardContent>
    </Card>}
    <Card className="size-full shadow-md">
      <CardContent className="flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <h3 className="font-bold text-3xl">{product.name}</h3>
          <span className="px-4 py-2 bg-gray-200 flex justify-center items-center font-medium w-fit rounded-full shadow-md text-xs">
            {product.category.name}
          </span>
        </div>
        <div className="flex gap-2 text-gray-500">
          <div className="flex gap-2">
            <MapPin size={16} />
            <p>{`${product.city}, ${product.state}`}</p>
          </div>
          |
          <div className="flex gap-2">
            <Clock size={16} />
            <p>{`Publicado em ${formattedDateFNS(new Date(product.createdAt))}`}</p>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-green-600">{currencyFormatter.format(product.price)}</h2>

        <span className="border mt-4 border-gray-200"></span>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Descrição</h3>
          <p className="text-sm">{product.description}</p>
        </div>
      </CardContent>
    </Card>
  </div>
}