import ResponsiveDialog from '@/components/ResponsiveDialog';
import { getCategoryById } from '@/services/apiCategory';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

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
   

    const { data } = useQuery({
        queryKey: ['categoryId', categoryId],
        queryFn: () => getCategoryById(Number(categoryId)),
        enabled: !!categoryId,
    });
    console.log(data);

 
    if (data)
        return (
            <ResponsiveDialog
                title='Editar categoría'
                isOpen={isEdit}
                setIsOpen={setIsEdit}
                description='Aquí puedes editar los datos de la categoría.'>
                <h1>Holaa</h1>
            </ResponsiveDialog>
        );
}
