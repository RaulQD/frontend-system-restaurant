import { addItemsToOrder } from "@/services/apiOrder"
import { useMutation } from "@tanstack/react-query"


export const useAddItemToOrder = () => {
  const { mutate: addItemToOrder, isPending } = useMutation({
    mutationFn: addItemsToOrder,
    onError: (error) => {
      console.error(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  })
  return { addItemToOrder, isPending }
}