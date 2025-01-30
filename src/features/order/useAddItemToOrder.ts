import { addItemsToOrder } from "@/services/apiOrder"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useAddItemToOrder = () => {
  const queryClient = useQueryClient()
  const { mutate: addItemToOrder, isPending } = useMutation({
    mutationFn: addItemsToOrder,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['activeOrder'] });
    },
  })
  return { addItemToOrder, isPending }
}