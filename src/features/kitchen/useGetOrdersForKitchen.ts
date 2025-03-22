import { getOrdersForKitchen } from "@/services/apiOrder"
import { OrdersList } from "@/types/order"
import { useQuery } from "@tanstack/react-query"

export const useGetOrdersForKitchen = () => {
  const { data: orders, isLoading, isError, error, refetch } = useQuery<OrdersList[]>({
    queryKey: ['ordersKitchen'],
    queryFn: getOrdersForKitchen,
    retry: false,
  })
  return { orders, isLoading, isError, error, refetch }
}