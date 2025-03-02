import { sendOrderToKitchen } from "@/services/apiOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSendOrderToKitchen = () => {
  const queryclient = useQueryClient();
  const { mutate: sendOrder, isPending } = useMutation({
    mutationFn: sendOrderToKitchen,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryclient.refetchQueries({ queryKey: ['ordersKitchen'] })
    }
  });
  return { sendOrder, isPending }
}