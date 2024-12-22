import api from "@/lib/axios"
import { Category, CategoryForm, CategoryV2 } from "@/types/category"
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
type UpdateCategoryType = {
  categoryId: Category['id'];
  formData: CategoryForm;
}

export const updateCategory = async ({ categoryId, formData }: UpdateCategoryType): Promise<CategoryV2> => {
  try {
    const { data } = await api.put<CategoryV2>(`/category/${categoryId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error inesperado al actualizar la categoría');
  }
}
export const getCategoryById = async (categoryId: Category['id']) => {
  try {
    const { data } = await api.get(`/category/${categoryId}`);
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
