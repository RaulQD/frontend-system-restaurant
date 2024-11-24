import { getOrderById } from '@/services/apiOrder';
import { OrderDetails } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderByID = (orderId: number) => {
  const { data: orderDetails, isLoading, error: ErrorOrderByID } = useQuery<OrderDetails>({
    queryKey: ['orderDetail', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,

  })
  return { orderDetails, isLoading, ErrorOrderByID };
}