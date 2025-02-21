import { deleteRoom } from "@/services/apiRooms"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useDeleteRoom = () => {
    const queryClient = useQueryClient()
    const { mutate: roomDelete, isPending } = useMutation({
      mutationFn: deleteRoom,
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
    return { roomDelete, isPending }
}