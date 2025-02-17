import api from "@/lib/axios";
import { isAxiosError } from "axios";


export const getRoles = async () => {
  try {
    const { data } = await api.get('/rol');
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}