import { createOrder } from "@/services/apiOrder"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateOrder = () => {
  const { mutate: createOrders, isPending } = useMutation({
    mutationFn: createOrder,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      console.log(data)
    }
  })
  return { createOrders, isPending }
}