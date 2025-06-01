import { Category } from '@/@types/category'
import { Pagination } from '@/@types/pagination'
import { Product } from '../../../../../@types/product'
import { BackButton } from '../../../../../components/routes/edit/back-button'
import { EditForm } from '../../../../../components/routes/edit/edit-form'
import { coletApi } from '../../../../../services/axios'

export default async function ProductUpdate({
  params,
}: {
  params: { id: string }
}) {
  const { data: product } = await coletApi.get<Product>(
    `/products/${params.id}`,
  )
  const { data: categories } =
    await coletApi.get<Pagination<Category>>(`/categories`)
  return (
    <div className="container my-10 flex flex-col items-center justify-center gap-8">
      <BackButton />
      <div className="container flex w-full flex-row justify-between">
        <EditForm product={product} categories={categories.data} />
      </div>
    </div>
  )
}
