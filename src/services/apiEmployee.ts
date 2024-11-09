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
    console.log(data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      console.log('error')
    }
  }
}

export const getEmployeeById = async (employeeid: Employee['id']) => {
  try {
    const { data } = await api.get<Employee>(`/employees/${employeeid}`)
    console.log(data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }

}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('profile_picture', file);

  const response = await api.post('/api/v1/employees/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.profile_picture_url;
}