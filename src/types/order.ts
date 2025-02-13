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


export type OrderDetails = Pick<Order, 'id_order' | 'table_id' | 'num_table' | 'employee_id' | 'names' | 'order_status' | 'created_at' | 'items'>;
// Para crear una orden nueva
export type OrderCreateData = {
  table_id: number; // Mesa a la que pertenece la orden
  employee_id: number; // Empleado que creó la orden

};

// Para listar órdenes en un panel
export type OrdersList = {
  id_order: number; // Identificador de la orden
  order_status: string; // Estado de la orden
  order_number: string; // Número de la orden
  employee: Employee;
  table: Tables;
  total: number; // Total de la orden
  created_at: string; // Fecha de creación
};

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