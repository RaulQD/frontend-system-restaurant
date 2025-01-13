import { getCategories } from '@/services/apiCategory';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
export const useGetCategories = () => {

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const keywordValue = searchParams.get('keyword') || ''
  const keyword = !keywordValue ? '' : keywordValue
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const { data: categories, isLoading, isError, error } = useQuery({
    queryKey: ['categories', keyword, page],
    queryFn: () => getCategories({ keyword, page }),
    retry: false,
  })
  const pageCount = Math.ceil((categories?.pagination.totalCategories || 0) / 10)
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['categories', keyword, page + 1],
      queryFn: () => getCategories({ keyword, page: page + 1 }),
    })

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['categories', keyword, page - 1],
        queryFn: () => getCategories({ keyword, page: page - 1 }),
      })
    }
  }
  return { categories, isLoading, isError, error, pageCount }
}