import api from "@/lib/axios"
import { DishesResponseType, DishType } from "@/types/dish";
import { isAxiosError } from "axios"

export type GetDishesAPIType = {
  page: number;
  keyword?: string;
  category: string;
}

export const getDishes = async ({ page, category, keyword }: GetDishesAPIType) => {
  try {
    const { data } = await api.get<DishesResponseType>('/dishes', { params: { page, category, keyword } });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}
export const getDishById = async (dishId: DishType['id']) => {
  try {
    const { data } = await api.get(`/dishes/${dishId}`);
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
    } else {
      throw new Error('Error de conexión')
    }
  }
}

export const updateDish = async (dishId: number, formData: FormData) => {
  try {
    const { data } = await api.put(`/dishes/${dishId}`, formData, {
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

export const deleteDish = async (dishId: DishType['id']) => {
  try {
    const { data } = await api.patch(`/dishes/${dishId}/delete`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export const restoredDish = async (dishId: DishType['id']) => {
  try {
    const { data } = await api.patch(`/dishes/${dishId}/restore`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}