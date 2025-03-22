import { getOrdersReadyForServing } from "@/services/apiOrder"
import { OrdersList } from "@/types/order"
import { useQuery } from "@tanstack/react-query"

export const useGetOrdersReady = () => {
  const { data: orders, isLoading, isError, error } = useQuery<OrdersList[]>({
    queryKey: ['ordersReady'],
    queryFn: getOrdersReadyForServing,
    retry: false,
  })

  return { orders, isLoading, isError, error }
}