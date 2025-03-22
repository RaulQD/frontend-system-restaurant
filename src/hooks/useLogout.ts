import { disconnectSocket } from "@/lib/sockets";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem('token');
    disconnectSocket();
    queryClient.clear();
    navigate('/auth/login');
  };
  return { logout };
}