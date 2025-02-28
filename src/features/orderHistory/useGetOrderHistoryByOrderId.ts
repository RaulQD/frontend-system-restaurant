import { getOrderHistoryByOrderId } from "@/services/apiOrder"
import { Order, OrderDetailsHistory } from "@/types/order"
import { useQuery } from "@tanstack/react-query"


export const useGetOrderHistoryByOrderId = (orderId: Order['id_order']) => {
  const { data: orderDetailsHistory, isLoading, isError, error } = useQuery<OrderDetailsHistory>({
    queryKey: ['orderDetailsHistory', orderId],
    queryFn: () => getOrderHistoryByOrderId(orderId),
    enabled: !!orderId,
  })
  return { orderDetailsHistory, isLoading, isError, error }
}