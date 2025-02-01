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

export type Items = {
  id_item: number;
  dish_id: number;
  dishes_name?: string;
  image_url?: string;
  unit_price?: number;
  subtotal: number;
  status: string;

  quantity: number;
}

export type OrderItem = Pick<Items, 'dish_id' | 'dishes_name' | 'image_url' | 'unit_price' | 'quantity' | 'status'>;


export type OrderDetails = Pick<Order, 'id_order' | 'table_id' | 'num_table' | 'employee_id' | 'names' | 'order_status' | 'created_at' | 'items'>;
// Para crear una orden nueva
export type OrderCreateData = {
  table_id: number; // Mesa a la que pertenece la orden
  employee_id: number; // Empleado que creó la orden

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

// PARA AÑADIR UN ITEM A UNA ORDERN
export type AddItemToOrderData = {
  order_id: number; // Identificador de la orden
  dish_id: number; // Identificador del plato
  quantity: number; // Cantidad del plato
};