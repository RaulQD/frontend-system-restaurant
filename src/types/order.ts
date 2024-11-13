export type Order = {
  id_order: number;
  table_id: number;
  employee_id: number;
  order_status: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

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
export type OrderResponse = {
  message: string;
  status: boolean;
  order: Order;
}
export type OrderItem = Pick<Item, 'dish_id' | 'dishes_name' | 'image' | 'unit_price' | 'quantity' | 'special_requests'>;
export type OrderCreateData = Omit<Order, 'id_order' | 'order_status' | 'created_at' | 'updated_at'>;

export type OrdersList = {
  id_order: number;
  names: string;
  num_table: number;
  order_status: string;
  total: number;
  created_at: Date;
  items: Item[];
}

export type Dish = {
  name: string;
}
