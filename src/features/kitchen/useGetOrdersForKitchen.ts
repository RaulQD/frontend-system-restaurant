import { getOrdersForKitchen } from "@/services/apiOrder"
import { OrdersList } from "@/types/order"
import { useQuery } from "@tanstack/react-query"

export const useGetOrdersForKitchen = () => {
  const { data: orders, isLoading, isError, error } = useQuery<OrdersList[]>({
    queryKey: ['ordersKitchen'],
    queryFn: getOrdersForKitchen,
    retry: false,
    // refetchInterval: 2000,
  })
  return { orders, isLoading, isError, error }
}