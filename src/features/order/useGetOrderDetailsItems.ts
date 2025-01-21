import { getOrderDetailsById } from "@/services/apiOrder"
import { Items, Order } from "@/types/order"
import { useQuery } from "@tanstack/react-query"

export const useGetOrderDetailsItems = (orderId: Order['id_order']) => {
  const { data: orderItems, isLoading, isError } = useQuery<Items>({
    queryKey: ['orderDetails', orderId],
    queryFn: () => getOrderDetailsById(orderId),
    enabled: !!orderId
  })
  return { orderItems, isLoading, isError }
}