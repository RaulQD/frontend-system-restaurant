import { createTable } from "@/services/apiTables";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateTable = () => {
  const queryCliente = useQueryClient();
  const { mutate: create, isPending, isError, error } = useMutation({
    mutationFn: createTable,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryCliente.invalidateQueries({ queryKey: ['tables'] })
      toast.success(data.message)
    },
  })
  return { create, isPending, isError, error }
}