export type Order = {
  table_id: number;
  employee_id: number;
  items: OrderItem[];
}

export type Item = {
  id_item: number;
  dish_id: number;
  quantity: number;
}

export type OrderItem = Pick<Item, 'dish_id' | 'quantity'>;