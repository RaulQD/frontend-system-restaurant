import { getOrderByTableId } from "@/services/apiOrder"
import { Order } from "@/types/order"
import { useQuery } from "@tanstack/react-query"

export const useGetOrderActiveForTable = (tableId: number) => {
  const { data: activeOrder, isLoading, isError, error } = useQuery<Order>({
    queryKey: ['activeOrder', tableId],
    queryFn: () => getOrderByTableId(tableId),
    retry: false,
    enabled: !!tableId
  })
  return { activeOrder, isLoading, isError, error }
}