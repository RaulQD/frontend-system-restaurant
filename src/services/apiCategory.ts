import api from "@/lib/axios"
import { Category, CategoryForm } from "@/types/category"
import { isAxiosError } from "axios"

export const getCategories = async () => {
  try {
    const { data } = await api.get('/category')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}
export const getCategoryById = async (categoryId: Category['id']) => {
  try {
    const { data } = await api.get(`/category/${categoryId}`);
    console.log(data)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export const createCategory = async (category: CategoryForm) => {
  try {
    const { data } = await api.post('/category', category);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}