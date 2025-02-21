import { authenticatedUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: autentication, isPending } = useMutation({
    mutationFn: authenticatedUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {

      queryClient.setQueryData(['user'], data);
      if (data?.role.role_name === 'cocinero') {
        navigate('/dashboard/kitchen')
      }
      if (data?.role.role_name === 'mesero') {
        navigate('/dashboard/table')
      }
      if (data?.role.role_name === 'administrador') {
        navigate('/dashboard/home')
      }
    }
  });
  return { autentication, isPending };
}