import { updateStatusItem } from "@/services/apiOrder"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateItemStatus = () => {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, error } = useMutation({
    mutationFn: ({ orderId, itemId, status }: { orderId: number, itemId: number, status: string }) => updateStatusItem(orderId, itemId, status),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orderDetail', data.order_id] })
      // queryClient.invalidateQueries({ queryKey: ['ordersKitchen'] })
      toast.success(data.message)
      
    }
  })
  return { updateStatus, error }
}