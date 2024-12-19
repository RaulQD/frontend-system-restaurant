import { getCategories } from '@/services/apiCategory';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';
export const useGetCategories = () => {
  const { data: categories, isLoading, isError, error } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  return { categories, isLoading, isError, error }
}