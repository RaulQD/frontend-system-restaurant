import api from "@/lib/axios";
import { DishType } from "@/types/dish";
import { Order, OrderCreateData } from "@/types/order";
import { isAxiosError } from "axios";

export const getOrdersForKitchen = async () => {
  try {
    const { data } = await api.get('/orders/kitchen');
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const getOrderDetailsById = async (orderId: Order['id_order']) => {
  try {
    const { data } = await api.get(`/orders/${orderId}/items`);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const getOrderByTableId = async (tableId: number) => {
  try {
    const { data } = await api.get(`/orders/active/${tableId}/`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const getOrderById = async (orderId: Order['id_order']) => {
  try {
    const { data } = await api.get(`/orders/${orderId}`);
    return data
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}


export const createOrder = async (order: OrderCreateData) => {
  try {
    const { data } = await api.post('/orders', order);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

type AddItemsToOrder = {
  orderId: Order['id_order'];
  dishId: DishType['id'];
  quantity: number;
  special_requests: string;
}

export const addItemsToOrder = async (orderItemsData: AddItemsToOrder) => {
  try {
    const { data } = await api.post(`/orders/${orderItemsData.orderId}/add-item`, orderItemsData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const getItemsByOrder = async (orderId: number) => {
  try {
    const { data } = await api.get(`/orders/${orderId}/items`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const updateStatusOrder = async (orderId: number, order_status: string) => {
  try {
    const { data } = await api.patch(`/orders/${orderId}/status`, { order_status });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const updateStatusItem = async (orderId: number, itemId: number, status: string) => {
  try {
    const { data } = await api.patch(`/orders/${orderId}/item/${itemId}/status`, { status });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}


export const cancelOrder = async (orderId: number) => {
  try {
    const { data } = await api.patch(`/orders/${orderId}`);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
} 