import { updateRoom } from "@/services/apiRooms"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateRoom = () => {
  const queryClient = useQueryClient()
  const { mutate: update, isPending } = useMutation({
    mutationFn: updateRoom,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({
        queryKey: ['rooms']
      })
    },
  })
  return { update, isPending }
}