import { getOrders } from "@/services/apiOrder"
import { OrdersList } from "@/types/order"
import { useQuery } from "@tanstack/react-query"

export const useOrders = () => {
  const { data: orders, isLoading, isError, error } = useQuery<OrdersList[]>({
    queryKey: ['orders'],
    queryFn: getOrders,
    retry: false
  })
  return { orders, isLoading, isError, error }
}