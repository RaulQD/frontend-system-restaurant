import api from "@/lib/axios";
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

export const getOrderActiveForTable = async (tableId: number) => {
  try {
    const { data } = await api.get(`/orders/tables/${tableId}/order`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const getOrderById = async (orderId: Order['id_order']) => {
  try {
    const { data } = await api.get(`/orders/${orderId}`);
    console.log(data);
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
    console.log(data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}


type OrderItemData = {
  orderId: number;
  dishId: number;
  quantity: number;
  price: number;
}

export const addItemsToOrder = async (orderItemdata: OrderItemData) => {
  try {
    const { data } = await api.post(`/orders/add-item`, orderItemdata);
    console.log(data);
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
    console.log(data);
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
    console.log(data);
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