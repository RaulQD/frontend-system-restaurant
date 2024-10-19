import { LoginResponse } from "@/types/auth";
import { EmployeeProfile } from "@/types/employee";

const USER_LOCAL_STORAGE_KEY = 'user';

export const useLocalStorage = () => {
  const saveUser = (user: LoginResponse) => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  }
  const removeUser = () => {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }
  const getUser = (): EmployeeProfile => {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  }
  return { saveUser, removeUser, getUser }
}