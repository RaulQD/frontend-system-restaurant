import { getCategoryById } from '@/services/apiCategory';
import { useQuery } from '@tanstack/react-query';
import EditCategoryModal from './EditCategoryModal';
import { useLocation } from 'react-router-dom';
import { CategoryForm } from '@/types/category';

export default function EditCategoryData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('editCategory');
    const open = categoryId ? true : false;
    
    const { data } = useQuery<CategoryForm>({
        queryKey: ['categoryId', categoryId],
        queryFn: () => getCategoryById(Number(categoryId)),
        enabled: !!categoryId,
    });
    console.log(data);
    if (data) return <EditCategoryModal data={data} categoryId={Number(categoryId)} open={open}/>;
}
