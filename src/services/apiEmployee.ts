import api from "@/lib/axios"
import { isAxiosError } from "axios"


export type GetDishesAPIType = {
  searchName: string
  searchLastName: string
  status: string
}

export const getEmployees = async ({ searchName, searchLastName, status }: GetDishesAPIType) => {
  try {
    const { data } = await api.get('/employees', { params: { searchName, searchLastName, status } })
    console.log(data.data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      console.log('error')
    }
  }
}