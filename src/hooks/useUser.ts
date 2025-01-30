import { getAuthenticatedUser } from "@/services/apiAuth"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getAuthenticatedUser,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

  });
  const isAdmin = user?.role === 'administrador';
  const isWaiter = user?.role === 'mesero';
  const isChef = user?.role === 'cocinero';

  return { user, isLoading, isError, error, isAdmin, isWaiter, isChef }
}