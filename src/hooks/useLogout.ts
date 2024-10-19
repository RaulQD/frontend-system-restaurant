import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as useLocalStorage from "@/utils/use.localstorage";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = () => {
    queryClient.clear();
    useLocalStorage.removeUser();
    navigate('/auth/login');
  };
  return { logout };
}