import { authenticatedUser } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {



  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: authenticatedUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      //MOSTRAR EL PRIMER NOMBRE Y APELLIDO DEL USUARIO
      const fullName = data?.data.full_name;
      const nameParts = fullName?.split(' ');
      const firstName = nameParts![0]
      const lastName = nameParts![2]
      toast.success(`Bienvenido ${firstName} ${lastName}`);
      navigate('/admin/dashboard');
    },
  });
  return { login, isPending };
}