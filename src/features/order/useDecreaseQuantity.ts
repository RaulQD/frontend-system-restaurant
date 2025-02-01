import { decreaseItemQuantity } from "@/services/apiOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDecreaseQuantity = () => {
  const queryClient = useQueryClient();
  const { mutate: decreaseQuantity } = useMutation({
    mutationFn: ({ orderId, dishId, quantity }: { orderId: number, dishId: number, quantity: number }) => decreaseItemQuantity(orderId, dishId, quantity),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data,variables) => {
      queryClient.invalidateQueries({ queryKey: ['activeOrder',variables.orderId] });
      toast.success(data.message);
    }
  })
  return { decreaseQuantity }
}