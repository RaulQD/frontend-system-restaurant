import { getItemsByOrder } from "@/services/apiOrder"
import { useQuery } from "@tanstack/react-query"


export const useOrderItems = (orderId: number) => {
  const { data: orderItems, isLoading, isError, error } = useQuery({
    queryKey: ['orderItems', orderId],
    queryFn: () => getItemsByOrder(orderId),
  })
  return { orderItems, isLoading, isError, error }
}