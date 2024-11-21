// export type Order = {
//   id_order: number;
//   table_id: number;
//   employee_id: number;
//   order_status: string;
//   created_at: string;
//   updated_at: string;
//   items: OrderItem[];
// }

export type Item = {
  id_item: number;
  dish_id: number;
  dishes_name?: string;
  image?: string;
  unit_price?: number;
  subtotal: number;
  special_requests?: string;
  quantity: number;
}
// export type OrderResponse = {
//   message: string;
//   status: boolean;
//   order: Order;
// }
export type OrderItem = Pick<Item, 'dish_id' | 'dishes_name' | 'image' | 'unit_price' | 'quantity' | 'special_requests'>;
// export type OrderCreateData = Omit<Order, 'id_order' | 'order_status' | 'created_at' | 'updated_at'>;

// export type OrdersList = {
//   id_order: number;
//   names: string;
//   num_table: number;
//   order_status: string;
//   total: number;
//   created_at: Date;
//   items: Item[];
// }

// export type Dish = {
//   name: string;
// }

// export type Dish = {
//   id_dish: number; // Agregado para identificar el plato
//   name: string;
//   image?: string;
//   unit_price?: number;
// };

// export type Item = {
//   id_item: number;
//   dish_id: number; // Referencia a `Dish`
//   dishes_name?: string;
//   image?: string; // Imagen del plato, opcional
//   unit_price?: number; // Precio unitario del plato
//   quantity: number; // Cantidad pedida
//   special_requests?: string; // Solicitudes especiales del cliente
//   subtotal: number; // Subtotal del item (unit_price * quantity)
// };

export type Order = {
  id_order: number; // Identificador único de la orden
  table_id: number; // Identificador de la mesa
  employee_id: number; // Identificador del empleado que creó la orden
  order_status: string; // Estado de la orden (por ejemplo: activa, completada, cancelada)
  created_at: string; // Fecha de creación
  updated_at: string; // Fecha de actualización
  items: Item[]; // Detalle de los items de la orden
};
// Para crear una orden nueva
export type OrderCreateData = {
  table_id: number; // Mesa a la que pertenece la orden
  employee_id: number; // Empleado que creó la orden
  items: Pick<Item, 'dish_id' | 'quantity' | 'special_requests'>[]; // Datos mínimos necesarios para crear una orden
};
export type Items = Pick<Item, 'dish_id' | 'quantity' | 'special_requests'>;

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