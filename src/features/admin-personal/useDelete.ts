import { deleteEmployee } from "@/services/apiEmployee";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";


export const useDelete = () => {
  const queryClient = useQueryClient();
  const { mutate: employeeDelete, isPending: isPendingEmployee, isError, error } = useMutation({
    mutationFn: (employeeId: number) => deleteEmployee(employeeId),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      queryClient.invalidateQueries({ queryKey: ['employeeId'] })
    }
  })
  return { employeeDelete, isPendingEmployee, isError, error }
}