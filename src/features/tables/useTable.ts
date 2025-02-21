import { getTables } from "@/services/apiTables";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useTable = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterRoom = searchParams.get('rooms') || ''
  const room = !filterRoom || filterRoom === 'todos' ? '' : filterRoom;

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const { data: tables, isLoading, isError, error } = useQuery({
    queryKey: ['tables', room, page],
    queryFn: () => getTables({ page, room }),
    retry: false,
  });

  const pageCount = Math.ceil((tables?.pagination.totalTables || 0) / 10)

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['tables', room, page + 1],
      queryFn: () => getTables({ page: page + 1, room }),
    })
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['tables', room, page - 1],
      queryFn: () => getTables({ page: page - 1, room }),
    })
  }
  return { tables, isLoading, isError, error, pageCount }

}