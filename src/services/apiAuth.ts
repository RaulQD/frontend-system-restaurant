import api from "@/lib/axios";
import { LoginDataForm, LoginResponse } from "@/types/auth";
import { EmployeeProfile } from "@/types/auth";
import { isAxiosError } from "axios";



export const authenticatedUser = async (dataForm: LoginDataForm) => {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', dataForm)
    localStorage.setItem('token', data.token)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}

export const registerUser = async (formData: FormData) => {
  try {
    const { data } = await api.post('/auth/account', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}
export const getAuthenticatedUser = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  try {
    const { data } = await api.get<EmployeeProfile>('/auth/profile')
    console.log(data)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}