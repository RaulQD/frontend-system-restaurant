import { api } from "@/lib/axios";
import { LoginDatForm } from "@/types/auth";
import { isAxiosError } from "axios";



export const authenticatedUser = async (dataForm: LoginDatForm) => {
  try {
    const response = await api.post('/auth/login', dataForm);
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}