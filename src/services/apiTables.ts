import api from '@/lib/axios';
import { TableFormData, TablePagination, Tables } from '../types/tables';
import { isAxiosError } from 'axios';


type TableQueryParams = {
  page: number
  room: string
}

export const getTables = async ({ page, room }: TableQueryParams) => {
  try {
    const { data } = await api.get<TablePagination>('/tables', { params: { page, room } })
    console.log(data.results)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al obtener las mesas');
    }
  }
}

export const getTablesByRoomName = async (room: string) => {
  try {
    const { data } = await api.get<Tables[]>('/tables/findTablesByRoom', { params: { room } })
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al obtener las mesas');
    }
  }
}

export const getTableById = async (idTable: Tables['id_table']) => {
  try {
    const { data } = await api.get(`/tables/${idTable}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al obtener las mesas');
    }
  }
}
export const createTable = async (table: TableFormData) => {
  try {
    const { data } = await api.post('/tables', table)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Error desconocido al crear la mesa');
    }
  }
}