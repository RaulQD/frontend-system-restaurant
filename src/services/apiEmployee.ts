import api from "@/lib/axios"
import { Employee, EmployeeResponse } from "@/types/employee"
import { isAxiosError } from "axios"


export type EmployeeQueryParams = {
  keyword: string
  status: string
  page: number
}

export const getEmployees = async ({ keyword, status, page }: EmployeeQueryParams) => {
  try {
    const { data } = await api.get<EmployeeResponse>('/employees', { params: { keyword, status, page } })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } 
  }
}

export const getEmployeeById = async (employeeid: Employee['id']) => {
  try {
    const { data } = await api.get(`/employees/${employeeid}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }

}
export const updateEmployee = async (employeeid: Employee['id'], formData: FormData) => {
  try {
    const { data } = await api.put(`/employees/${employeeid}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}
export const deleteEmployee = async (employeeid: Employee['id']) => {
  try {
    const { data } = await api.patch(`/employees/${employeeid}`)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}