import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from '../../services/apiCategory';
import toast from "react-hot-toast";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: categoryDelete, isPending, isError, error } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data.message);
    }
  });
  return { categoryDelete , isPending, isError, error };
}