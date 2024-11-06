import api from "@/lib/axios"
import { DishesResponseType } from "@/types/dish";
import { isAxiosError } from "axios"

export type GetDishesAPIType = {
  page: number;
  keyword?: string;
  category: string;
}

export const getDishes = async ({ page, category, keyword }: GetDishesAPIType) => {
  try {
    const { data } = await api.get<DishesResponseType>('/dishes', { params: { page, category, keyword } });
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export const createDish = async (formData: FormData) => {
  try {
    const { data } = await api.post('/dishes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}