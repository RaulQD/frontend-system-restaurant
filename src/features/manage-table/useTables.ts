import { getTablesByRoomName } from "@/services/apiTables";
import { Tables } from "@/types/tables";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";


export const useTables = () => {

  const [searchParams] = useSearchParams();
  const room = searchParams.get('room') || 'comerdor principal';

  const { data: tables, isLoading, isError, error } = useQuery<Tables[]>({
    queryKey: ['getTablesByRoomName', room],
    queryFn: () => getTablesByRoomName(room),
  })
  return { tables, isLoading, isError, error }
}