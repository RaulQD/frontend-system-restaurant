export type Order = {
  id_order: number;
  table_id: number;
  employee_id: number;
  items: OrderItem[];
}

export type Item = {
  id_item: number;
  dish_id: number;
  dishes_name?: string;
  image?: string;
  price?: number;
  quantity: number;
}
export type OrderResponse = {
  message: string;
  status: boolean;
  order: Order;
}
export type OrderItem = Pick<Item, 'dish_id' | 'dishes_name' | 'image' | 'price' | 'quantity'>;
export type OrderCreateData = Omit<Order, 'id_order'>;

