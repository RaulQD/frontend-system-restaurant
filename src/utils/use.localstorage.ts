import { LoginResponse } from "@/types/auth";
import { EmployeeProfile } from "@/types/auth";

const USER_LOCAL_STORAGE_KEY = 'user';


export const saveUser = (user: LoginResponse): void => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export const removeUser = (): void => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
export const getUser = (): EmployeeProfile => {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}