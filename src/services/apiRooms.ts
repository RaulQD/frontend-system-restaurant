import api from "@/lib/axios"
import { RoomFormData, Rooms } from "@/types/rooms"
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

export const getRoomById = async (roomId: Rooms['id']) => {
  try {
    const { data } = await api.get(`/rooms/${roomId}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al obtener la habitación');
    }
  }
}


export const createRoom = async (formData: RoomFormData) => {
  try {
    const { data } = await api.post('/rooms', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al crear la habitación');
    }
  }
}
type UpdateRoomType = {
  roomId: Rooms['id']
  formData: RoomFormData
}

export const updateRoom = async ({ roomId, formData }: UpdateRoomType) => {
  try {
    const { data } = await api.put(`/rooms/${roomId}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al actualizar la habitación');
    }
  }
}

export const deleteRoom = async (roomId: Rooms['id']) => {
  try {
    const { data } = await api.delete(`/rooms/${roomId}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al eliminar la habitación');
    }
  }
}
