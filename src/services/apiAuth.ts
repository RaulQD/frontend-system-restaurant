import api from "@/lib/axios";
import { LoginDataForm, LoginResponse } from "@/types/auth";
import { isAxiosError } from "axios";



export const authenticatedUser = async (dataForm: LoginDataForm) => {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', dataForm)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}