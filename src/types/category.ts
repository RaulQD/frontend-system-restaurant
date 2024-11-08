
export type Category = {
  id: number;
  category_name: string;
  category_description: string;
}

export type CategoryForm = Pick<Category, 'category_name' | 'category_description'>;