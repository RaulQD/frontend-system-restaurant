import api from "@/lib/axios";
import { Employee } from "@/types/employee";
import { AddItemToOrderData, Order, OrderCreateData, OrderResponseType, OrdersList, PaymentResponse } from "@/types/order";
import { isAxiosError } from "axios";

type GetOrdersAPIType = {
  page: number;
  keyword?: string;
  status: string;
  startDate?: string;
  endDate?: string;
}

export const getOrders = async ({ page, keyword, status, startDate, endDate }: GetOrdersAPIType) => {
  try {
    const { data } = await api.get<OrderResponseType>('/orders', { params: { page, keyword, status, startDate, endDate } });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const getOrdersForKitchen = async () => {
  try {
    const { data } = await api.get('/orders/kitchen');
    console.log(data);
    return data;
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const getOrdersReadyForServing = async () => {
  try {
    const { data } = await api.get<OrdersList[]>('/orders/ready-for-serving')
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error al obtener las ordenes listas para servir');
  }
}
export const getOrderDetailsById = async (orderId: Order['id_order']) => {
  try {
    const { data } = await api.get(`/orders/${orderId}/items`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const getOrderHistoryByOrderId = async (orderId: Order['id_order']) => { 
  try {
    const { data } = await api.get(`/orders/${orderId}/details`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const getOrderByTableId = async (tableId: number) => {
  try {
    const { data } = await api.get(`/orders/active/${tableId}`);
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
    return data
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
export const addItemsToOrder = async (orderItems: AddItemToOrderData) => {
  try {
    const { data } = await api.patch(`/orders/${orderItems.order_id}/add-item`, orderItems);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
export const decreaseItemQuantity = async (orderId: number, itemId: number, quantity: number) => {
  try {
    const { data } = await api.patch(`/orders/${orderId}/decrease-quantity`, { itemId, quantity });
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
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const sendOrderToKitchen = async (orderId: number) => {
  try {
    const { data } = await api.patch(`/orders/${orderId}/send-to-kitchen`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const cancelOrder = async (orderId: number) => {
  try {
    const { data } = await api.patch(`/orders/${orderId}/cancel`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const getOrderSummary = async (orderId: number) => {
  try {
    const { data } = await api.get(`/orders/${orderId}/summary`);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}


export const processPaymentOrder = async (orderId: number, amount_received: number, employee_id: Employee['id']) => {
  try {
    const { data } = await api.post<PaymentResponse>(`/orders/${orderId}/payment`, { amount_received, employee_id });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}