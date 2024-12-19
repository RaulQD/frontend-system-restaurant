import { createCategory } from "@/services/apiCategory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: AddCategory, isPending } = useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success(data.message)
    }
  })
  return { AddCategory, isPending }
}