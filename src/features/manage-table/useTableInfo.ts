import { getTableById } from "@/services/apiTables"
import { Tables } from "@/types/tables"
import { useQuery } from "@tanstack/react-query"


export const useTableInfo = (tableId:Tables['id_table']) => {
  const { data: tableById, isLoading, error } = useQuery<Tables>({
    queryKey: ['tableByID',tableId],
    queryFn: () => getTableById(tableId)
  })

  return { tableById, isLoading, error }
}