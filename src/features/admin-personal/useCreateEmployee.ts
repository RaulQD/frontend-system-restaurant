import { registerUser } from "@/services/apiAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()
  const navigarte = useNavigate()
  const { mutate: createEmployee } = useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success(data.message)
      navigarte('/dashboard/employees')
    }
  })
  return { createEmployee }
}