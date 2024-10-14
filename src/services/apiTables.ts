import api from '@/lib/axios';
import { Tables } from '../types/tables';
import { isAxiosError } from 'axios';


export const getTablesByRoomName = async (room: string) => {
  try {
    // const encodedRoom = encodeURIComponent(room)
    const { data } = await api.get<Tables[]>('/tables/findTablesByRoom', { params: { room } })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al obtener las mesas');
    }
  }
}