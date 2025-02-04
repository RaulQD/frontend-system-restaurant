import { decreaseItemQuantity } from "@/services/apiOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export const useDecreaseQuantity = () => {
  const { tableId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: decreaseQuantity } = useMutation({
    mutationFn: ({ orderId, dishId, quantity }: { orderId: number, dishId: number, quantity: number }) => decreaseItemQuantity(orderId, dishId, quantity),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['activeOrder', Number(tableId)] });
    }
  })
  return { decreaseQuantity }
}