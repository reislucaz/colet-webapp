import { Product } from "../../../../@types/product"
import { BackButton } from "../../../../components/routes/edit/back-button"
import { ProductDetailsSession } from "../../../../components/routes/product-details/product-details-session"
import { Card } from "../../../../components/ui/card"
import { coletApi } from "../../../../services/axios"

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { data: product } = await coletApi.get<Product>(`/products/${params.id}`)

  return <div className="flex flex-col gap-8 my-10 justify-center items-center container">
    <BackButton />
    <div className="flex flex-row container justify-between">
      <ProductDetailsSession product={product} />
      <div className="flex flex-col w-2/5 gap-5 h-full">Negociações
        {/* Map de negociações */}
        <Card className="size-full shadow-md">
        </Card>
        <Card className="size-full shadow-md">
        </Card>
        <Card className="size-full shadow-md">
        </Card>
        <Card className="size-full shadow-md">
        </Card>
        <Card className="size-full shadow-md">
        </Card>
      </div>
    </div>
  </div>
}
