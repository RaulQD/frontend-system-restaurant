import { getCategoryById } from '@/services/apiCategory';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';
import EditCategoryModal from './EditCategoryModal';
import { useLocation } from 'react-router-dom';

type EditCategoryDataProps = {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    categoryId: Category['id'];
};

export default function EditCategoryData({
    isEdit,
    setIsEdit,
}: EditCategoryDataProps) {
    const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('editCategory')!;
    console.log(categoryId);
    const { data } = useQuery<Category> ({
        queryKey: ['categoryId', categoryId],
        queryFn: () => getCategoryById(Number(categoryId)),
        enabled: !!categoryId,
    });
    if (data) return <EditCategoryModal data={data} isEdit={isEdit} setIsEdit={setIsEdit} categoryId={Number(categoryId)}/>;
}
