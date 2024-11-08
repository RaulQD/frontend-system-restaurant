import api from "@/lib/axios";
import { Order } from "@/types/order";
import { isAxiosError } from "axios";

export const getOrders = async () => {
  try {
    const { data } = await api.get('/orders');
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const createOrder = async (order: Order) => {
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