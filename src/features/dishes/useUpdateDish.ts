import { updateDish } from "@/services/apiDishes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useUpdateDish = () => {
  const queryClient = useQueryClient()
  const { mutate: editDish, isPending, isError, error } = useMutation({
    mutationFn: ({ dishId, formData }: { dishId: number, formData: FormData }) => updateDish(dishId, formData),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] })
      queryClient.invalidateQueries({ queryKey: ['dishId', data.id] })
      toast.success(data.message)
    }
  })
  return { editDish, isPending, isError, error }
}