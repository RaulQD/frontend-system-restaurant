
export type Category = {
  id: number;
  category_name: string;
  category_description: string;
  status: 'DISPONIBLE' | 'NO DISPONIBLE';
}

export type CategoryForm = Pick<Category, 'category_name' | 'category_description' | 'status'>;

export type CategoryV2 = {
  id: number;
  category_name: string;
  category_description: string;
  status: boolean;
  message: string;
}
export type PaginationInfo = {
  page: number;
  limit: number;
  totalCategories: number;
}
export type CategoryPagination = {
  results: Category[];
  pagination: PaginationInfo;
}