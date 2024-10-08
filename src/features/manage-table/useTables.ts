import { getTablesByRoomName } from "@/services/apiTables";
import { Tables } from "@/types/tables";
import { useQuery } from "@tanstack/react-query";


export const useTables = (room: string) => {



  const { data: tables, isLoading, isError, error } = useQuery<Tables[]>({
    queryKey: ['getTablesByRoomName', room],
    queryFn: () => getTablesByRoomName(room),
    enabled: !!room //para no ejecutar la consulta si room es undefined o vacio.
  })
  return { tables, isLoading, isError, error }
}