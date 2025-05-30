import { Product } from "../../../../../@types/product";
import { BackButton } from "../../../../../components/routes/edit/back-button";
import { EditForm } from "../../../../../components/routes/edit/edit-form";
import { coletApi } from "../../../../../services/axios";

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { data: product } = await coletApi.get<Product>(`/products/${params.id}`)

  return <div className="flex flex-col gap-8 my-10 justify-center items-center container">
    <BackButton />
    <div className="flex flex-row container justify-between w-full">
      <EditForm />
    </div>
  </div>
}
