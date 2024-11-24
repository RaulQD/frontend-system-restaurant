import { updateStatusItem } from "@/services/apiOrder"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateItemStatus = () => {
  const { mutate: updateStatus, error } = useMutation({
    mutationFn: ({ orderId, itemId, status }: { orderId: number, itemId: number, status: string }) => updateStatusItem(orderId, itemId, status),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
    }
  })
  return { updateStatus, error }
}