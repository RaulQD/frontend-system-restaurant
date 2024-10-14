import { Category } from "./category";

export type Dish = {
  id: string;
  dish_name: string;
  dish_description: string;
  price: number;
  available: string;
  category: string;
}

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