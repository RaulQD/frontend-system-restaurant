import { getOrderSummary } from "@/services/apiOrder";
import { OrderSummary } from "@/types/order";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";

export const useGetOrderSummary = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: orderSummary, isLoading, isError, error } = useQuery<OrderSummary>({
    queryKey: ['orderSummary', orderId],
    queryFn: () => getOrderSummary(Number(orderId)),
    enabled: !!orderId
  })
  return { orderSummary, isLoading, isError, error }
}