import { getTablesByRoomName } from "@/services/apiTables";
import { useQuery } from "@tanstack/react-query";


export const useTables = (room: string) => {

  const { data: tables, isLoading, isError, error } = useQuery({
    queryKey: ['getTablesByRoomName', room],
    queryFn: () => getTablesByRoomName(room),
    enabled: !!room, //para no ejecutar la consulta si room es undefined o vacio.
    retry: false
  })
  return { tables, isLoading, isError, error }
}