// export type Order = {
//   id_order: number;
//   table_id: number;
//   employee_id: number;
//   order_status: string;
//   created_at: string;
//   updated_at: string;
//   items: OrderItem[];
// }

export type Items = {
  id_item: number;
  dish_id: number;
  dishes_name?: string;
  image_url?: string;
  unit_price?: number;
  subtotal: number; 
  status: string;
  special_requests?: string;
  quantity: number;
}

export type OrderItem = Pick<Items, 'dish_id' | 'dishes_name' | 'image_url' | 'unit_price' | 'quantity' | 'status'| 'special_requests'>;

export type Order = {
  id_order: number;
  employee_id: number;
  names: string;
  table_id: number;
  num_table: number;
  order_status: string;
  total: string;
  created_at: Date;
  items: Items[];
};
export type OrderDetails = Pick<Order, 'id_order' | 'table_id' | 'num_table' | 'employee_id' | 'names' | 'order_status' | 'created_at' | 'items'>;
// Para crear una orden nueva
export type OrderCreateData = {
  table_id: number; // Mesa a la que pertenece la orden
  employee_id: number; // Empleado que creó la orden
  items: OrderItem[]; // Items de la orden
};


// Para la respuesta al crear/obtener una orden
export type OrderResponse = {
  message: string; // Mensaje de respuesta
  status: boolean; // Estado de la operación
  order: Order; // Detalles de la orden
};

// Para listar órdenes en un panel
export type OrdersList = {
  id_order: number; // Identificador de la orden
  names: string; // Nombre del cliente o referencia
  num_table: number; // Número de la mesa
  order_status: string; // Estado de la orden
  total: number; // Total de la orden
  created_at: string; // Fecha de creación
};
