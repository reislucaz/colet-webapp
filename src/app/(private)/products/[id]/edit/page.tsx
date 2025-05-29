import { Product } from "../../../../../@types/product";
import { BackButton } from "../../../../../components/routes/edit/back-button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { coletApi } from "../../../../../services/axios";

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { data: product } = await coletApi.get<Product>(`/products/${params.id}`)

  return <div className="flex flex-col gap-8 my-10 justify-center items-center container">
    <BackButton />
    <div className="flex flex-row container justify-between">
      <div className="w-1/2 h-full gap-5 flex flex-col">
        <h2>Dados do produto</h2>
        <Card className="size-full shadow-md">
          <CardContent>
            <h3>Nome: {product.name}</h3>
            <h3>Descrição: {product.description}</h3>
            <h3>Categoria: {product.category.name}</h3>
            <h3>Preço: {product.price}</h3>
            <h3>Endereço: {product.neighborhood}, {product.city} - {product.state}</h3>
          </CardContent>
        </Card>
      </div>
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
