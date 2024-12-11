import { deleteDish } from "@/services/apiDishes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { restoredDish } from '../../services/apiDishes';
import { DishType } from "@/types/dish";


export const useDishActions = () => {
  const queryClient = useQueryClient();
  //ELIMINAR PLATO(MARCAR COMO ELIMINADO)
  const deleteDishMutation = useMutation({
    mutationFn: (dishId: DishType['id']) => deleteDish(dishId),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
      toast.success(data.message);
    }
  })

  const restoredDishMutation = useMutation({
    mutationFn: (dishId: DishType['id']) => restoredDish(dishId),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
      toast.success(data.message);
    }
  })
  return  { deleteDishMutation, restoredDishMutation }
}