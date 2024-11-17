import { getOrderActiveForTable } from "@/services/apiOrder"
import { Order } from "@/types/order"
import { useQuery } from "@tanstack/react-query"

export const useGetOrderActiveForTable = (tableId: number) => {
  const { data:activeOrder, isLoading } = useQuery<Order>({
    queryKey: ['orderDetails', tableId],
    queryFn: () => getOrderActiveForTable(tableId),
    enabled: !!tableId // only fetch when tableId is defined
  })
  return { activeOrder, isLoading }
}