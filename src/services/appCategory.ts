import api from "@/lib/axios"
import { isAxiosError } from "axios"

export const getCategories = async () => {
  try {
    const { data } = await api.get('/category')
    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}