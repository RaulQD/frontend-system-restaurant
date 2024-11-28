import { getCategories } from "@/services/appCategory";
import { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";

export default function EditDishForm() {
  const { data: category } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
});
  return (
    <div>EditDishForm</div>
  )
}
