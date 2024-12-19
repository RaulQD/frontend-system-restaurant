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
      //MOSTRAR EL PRIMER NOMBRE Y APELLIDO DEL USUARIO
      const fullName = data?.full_name;
      const nameParts = fullName?.split(' ');
      const firstName = nameParts![0]
      const lastName = nameParts![2]
      toast.success(`Bienvenido ${firstName} ${lastName}`);

      queryClient.setQueryData(['user'], data);
      navigate('/dashboard/tables');
    },
  });
  return { autentication, isPending };
}