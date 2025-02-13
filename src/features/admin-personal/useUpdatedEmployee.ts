import { updateEmployee } from "@/services/apiEmployee"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useUpdatedEmployee = () => {
  const queryClient = useQueryClient();
  const { mutate: editEmployee, isPending: isPendingEmployee, isError, error } = useMutation({
    mutationFn: ({ employeeId, formData }: { employeeId: number, formData: FormData }) => updateEmployee(employeeId, formData),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:['employees']})
      queryClient.invalidateQueries({queryKey:['employeeId']})
    }
  })
  return { editEmployee, isPendingEmployee, isError, error }
}