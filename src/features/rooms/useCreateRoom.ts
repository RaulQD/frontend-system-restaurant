import { createRoom } from "@/services/apiRooms"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateRoom = () => {
  const queryClient = useQueryClient()
  const { mutate: create, isPending, isError, error } = useMutation({
    mutationFn: createRoom,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
  return { create, isPending, isError, error }
}