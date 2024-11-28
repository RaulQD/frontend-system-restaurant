import { createDish } from "@/services/apiDishes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useAddDishes = () => {
  const queryClient = useQueryClient();
  const { mutate: addDish, isPending: isPendingDishes } = useMutation({
    mutationFn: createDish,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
      toast.success(data.message);
    },
  });
  return { addDish, isPendingDishes };
}