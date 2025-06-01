import { CategoryService } from '@/services/category'
import { useQuery } from '@tanstack/react-query'

export function useCategories() {
  const manyCategoriesQuery = useQuery({
    queryFn: CategoryService.getMany,
    queryKey: ['teste'],
  })

  return { manyCategoriesQuery }
}
