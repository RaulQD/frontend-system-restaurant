import api from "@/lib/axios";
import { isAxiosError } from "axios";

export const getOrders = async () => {
  try {
    const { data } = await api.get('/orders');
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}