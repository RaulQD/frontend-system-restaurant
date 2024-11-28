import { Category } from "./category";

export type DishType = {
  id: number;
  dishes_name: string;
  dishes_description: string;
  price: number;
  available: string;
  image_url?: FileList | null;
  category_name: string;
}



export type DishesFormData = Pick<DishType, 'dishes_name' | 'dishes_description' | 'price' | 'image_url' | 'category_name'>


export type DishesType = {
  id: number;
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