import { getRooms } from "@/services/apiRooms"
import { Rooms } from "@/types/rooms"
import { useQuery } from "@tanstack/react-query"

export const useRooms = () => {
  const { data: rooms, error, isLoading, isError} = useQuery<Rooms[]>({
    queryKey: ['rooms'],
    queryFn: getRooms,
  })
  return { rooms, error, isLoading,isError }
}