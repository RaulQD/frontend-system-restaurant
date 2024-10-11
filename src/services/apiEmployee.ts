import api from "@/lib/axios"
import { EmployeeResponse } from "@/types/employee"
import { isAxiosError } from "axios"


export type EmployeeQueryParams = {
  searchName: string
  searchLastName: string
  status: string
  page: number
}

export const getEmployees = async ({ searchName, searchLastName, status, page }: EmployeeQueryParams) => {
  try {
    const { data } = await api.get<EmployeeResponse>('/employees', { params: { searchName, searchLastName, status, page } })

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      console.log('error')
    }
  }
}