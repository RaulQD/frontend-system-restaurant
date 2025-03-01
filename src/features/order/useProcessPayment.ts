import { processPaymentOrder } from "@/services/apiOrder"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useProcessPayment = () => {
  const { mutate: processPayment, isPending: isLodingPayment, isError, error } = useMutation({
    mutationFn: ({ orderId, amount_received, employee_id }: { orderId: number, amount_received: number, employee_id: number }) => processPaymentOrder(orderId, amount_received, employee_id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data) return;
      toast.success(data?.message);
    }

  })
  return { processPayment, isLodingPayment, isError, error }
}