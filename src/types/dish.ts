import { Category } from "./category";

export type Dish = {
  id: string;
  dishes_name: string;
  dishes_description: string;
  price: number;
  available: string;
  image_url?: FileList;
  category_name: string;
}
export type DishesFormData = Pick<Dish, 'dishes_name' | 'dishes_description' | 'price' | 'image_url' | 'category_name'>

export type DishesType = {
  id: string;
  dishes_name: string;
  dishes_description: string;
  price: number;
  available: string;
  image_url?: string;
  category: Category;
}

export type PaginationInfoType = {
  page: number;
  limit: number;
  totalDishes: number;
}
export type DishesResponseType = {
  results: DishesType[];
  pagination: PaginationInfoType
}