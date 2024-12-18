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
    if (!localStorage.getItem('token')) {
      console.error('Token no encontrado en localStorage');
    }
  }, []);
  const isAdmin = user?.role === 'administrador';
  const isWaiter = user?.role === 'mesero';
  const isChef = user?.role === 'cocinero';

  return { user, isLoading, isError, error, isAdmin, isWaiter, isChef }
}