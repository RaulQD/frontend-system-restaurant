import { cancelOrder } from "@/services/apiOrder"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useCancelOrder = () => {
  const queryClient = useQueryClient()
  const { mutate: cancellationOrder, isPending:isCancelOrder } = useMutation({
    mutationFn: (orderId: number) => cancelOrder(orderId),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['ordersKitchen'] });
    }
  })
  return { cancellationOrder,isCancelOrder }
}