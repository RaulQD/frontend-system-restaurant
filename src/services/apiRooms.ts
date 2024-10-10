import api from "@/lib/axios"
import { isAxiosError } from "axios"



export const getRooms = async () => {
  try {
    const { data } = await api.get('/rooms')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al obtener las habitaciones');
    }
  }
}