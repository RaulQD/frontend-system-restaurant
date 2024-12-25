import { getCategoryById } from '@/services/apiCategory';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';
import EditCategoryModal from './EditCategoryModal';

type EditCategoryDataProps = {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    categoryId: Category['id'];
};

export default function EditCategoryData({
    isEdit,
    setIsEdit,
    categoryId,
}: EditCategoryDataProps) {
  
    const { data } = useQuery<Category> ({
        queryKey: ['categoryId', categoryId],
        queryFn: () => getCategoryById(Number(categoryId)),
        enabled: !!categoryId,
    });
    if (data) return <EditCategoryModal data={data} isEdit={isEdit} setIsEdit={setIsEdit} categoryId={Number(categoryId)}/>;
}
