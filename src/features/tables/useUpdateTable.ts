import { updateTable } from "@/services/apiTables";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateTable = () => {
  const queryClient = useQueryClient();
  const { mutate: update, isPending, isError, error } = useMutation({
    mutationFn: updateTable,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tables'] })
      toast.success(data.message)
    },
  })
  return { update, isPending, isError, error }
}