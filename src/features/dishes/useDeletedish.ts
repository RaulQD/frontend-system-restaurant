import { deleteDish } from "@/services/apiDishes"
import { DishType } from "@/types/dish"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useDeleteDih = () => {
  const queryClient = useQueryClient()
  const { data: dishDelete } = useMutation({
    mutationFn: (dishId: DishType['id']) => deleteDish(dishId),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] })
      toast.success(data.message)
    }
  })
  return dishDelete
}