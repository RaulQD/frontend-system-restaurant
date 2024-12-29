import { getCategoryById } from '@/services/apiCategory';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';
import EditCategoryModal from './EditCategoryModal';
import { useLocation } from 'react-router-dom';

type EditCategoryDataProps = {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditCategoryData({
    isEdit,
    setIsEdit,
}: EditCategoryDataProps) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');
    console.log(categoryId);
    const { data } = useQuery<Category> ({
        queryKey: ['categoryId', categoryId],
        queryFn: () => getCategoryById(Number(categoryId)),
        enabled: !!categoryId,
    });
    console.log(data);
    if (data) return <EditCategoryModal data={data} isEdit={isEdit} setIsEdit={setIsEdit} categoryId={Number(categoryId)}/>;
}
