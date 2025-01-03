import { updateCategory } from "@/services/apiCategory"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useEditCategory = () => {
  const queryClient = useQueryClient();
    
  const { mutate: update, isPending, isError, error } = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categoryId'] });
      toast.success(data.message)
    }
  })
  return { update, isPending, isError, error }
}