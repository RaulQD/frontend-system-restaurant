import { Employee } from "./employee";
import { Tables } from "./tables";

export type Order = {
  id_order: number;
  employee_id: number;
  names: string;
  table_id: number;
  num_table: number;
  order_status: string;
  order_number: string;
  total: string;
  created_at: Date;
  items: Items[];
};

export type Items = {
  id_item: number;
  order_id: number;
  dish_id: number;
  dishes_name?: string;
  image_url?: string;
  unit_price: number;
  subtotal: number;
  status: string;
  quantity: number;
}

export type OrderItem = Pick<Items, 'id_item' | 'dish_id' | 'dishes_name' | 'image_url' | 'unit_price' | 'quantity' | 'status' | 'subtotal'>;


export type OrderDetails = {
  id_order: number;
  employee: Employee;
  table: Tables;
  order_status: string;
  order_number: string;
  total: number;
  created_at: string;
  updated_at: string;
  items: Items[];
}
// Para crear una orden nueva
export type OrderCreateData = {
  table_id: number; // Mesa a la que pertenece la orden
  employee_id: number; // Empleado que creó la orden

};

// Para listar órdenes en un panel
export type OrdersList = {
  id_order: number;
  order_status: string;
  order_number: string;
  employee: Employee;
  table: Tables;
  total: number;
  minutes_elapsed: number;
  created_at: string;
  updated_at: string;
  start_time: string;
  end_time: string;
  ready_time: string;
};
export type OrderDetailsHistory = {
  id_order: number;
  employee: Employee;
  table: Tables;
  order_status: string;
  order_number: string;
  total: number;
  created_at: string;
  updated_at: string;
  items: Items[];
}

// PARA AÑADIR UN ITEM A UNA ORDERN
export type AddItemToOrderData = {
  order_id: number; // Identificador de la orden
  dish_id: number; // Identificador del plato
  quantity: number; // Cantidad del plato
};

export type OrderSummary = {
  orderId: number; // Identificador de la orden
  orderItems: OrderItem[]; // Items de la orden
}

export type PaymentResponse = {
  message: string;
  status: boolean;
  payment: {
    order_id: number;
    total_paid: number;
    amount_received: number;
    change_amount: number;
    employe_name: string;
  };
}
export type PaginationInfoType = {
  page: number;
  limit: number;
  totalOrders: number;
}
export type OrderResult = {
  id_order: number;
  employee: Employee;
  tables: Tables;
  order_status: string;
  order_number: string;
  total: number;
  created_at: Date;
  updated_at: Date;
}

export type OrderResponseType = {
  results: OrderResult[]
  pagination: PaginationInfoType;
}
export type ProcessPaymentDataValues = {
  amount_received: string;
  employee_id: number;
  employee_name: string;
  change_amount: number;
};

export type OrderResponse = {
  message: string;
  status: boolean;
  order: Order;
}