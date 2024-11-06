
import { getDishes } from "@/services/apiDishes";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export const useDishes = () => {

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams()
  // FILTER BY CATEGORY
  const filterCategory = searchParams.get('category') || ''
  // VALIDATE IF NO CATEGORY IS SELECTED, SHOW ALL DISHES
  const category = !filterCategory || filterCategory === 'todos' ? '' : filterCategory;

  // SEARCH FILTER BY NAME
  const keywordValue = searchParams.get('keyword') || ''
  const keyword = !keywordValue ? '' : keywordValue

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  //FETCH DISHES DATA
  const { data: dishes, isLoading: isLoadingDishes, isError: isErrorDishes, error } = useQuery({
    queryKey: ['dishes', keyword, category, page],
    queryFn: () => getDishes({ keyword, category, page }),
    retry: false,
  })
  // CALCULATE THE NUMBER OF PAGES
  const pageCount = Math.ceil((dishes?.pagination.totalDishes || 0) / 10)

  //prefetch -> CARGA DE DATOS DE FORMA ASINCRONA
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['dishes', keyword, category, page + 1],
      queryFn: () => getDishes({ keyword, category, page: page + 1 }),
    })
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['dishes', keyword, category, page - 1],
      queryFn: () => getDishes({ keyword, category, page: page - 1 }),
    })
  }

  return { dishes, isLoadingDishes, isErrorDishes, error, pageCount }
}