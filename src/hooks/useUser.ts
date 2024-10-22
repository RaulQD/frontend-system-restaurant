import { getAuthenticatedUser } from "@/services/apiAuth"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useUser = () => {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getAuthenticatedUser,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

  });
  // Manejo de errores fuera de la configuración
  useEffect(() => {
    if (!localStorage.getItem('AUTHENTICATION')) {
      console.error('Token no encontrado en localStorage');
    }
  }, []);
  console.log(user)
  const isAdmin = user?.role.name === 'administrador';
  const isWaiter = user?.role.name === 'mesero';
  const isChef = user?.role.name === 'cocinero';

  return { user, isLoading, isError, error, isAdmin, isWaiter, isChef }
}