import { updateDish } from "@/services/apiDishes"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useUpdateDish = () => {
  const { mutate: editDish, isPending, isError, error } = useMutation({
    mutationFn: ({ dishId, formData }: { dishId: number, formData: FormData }) => updateDish(dishId, formData),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
    }
  })
  return { editDish, isPending, isError, error }
}