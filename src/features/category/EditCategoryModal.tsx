import ResponsiveDialog from '@/components/ResponsiveDialog';
import { Category, CategoryForm } from '@/types/category';
import { useForm } from 'react-hook-form';
import Categoryform from './Categoryform';
import { Button } from '@/components/ui/button';
import SpinnerMini from '@/components/SpinnerMini';
import { BiSave } from 'react-icons/bi';
import { useEditCategory } from './useEditCategory';


type EditCategoryModalProps = {
    data: CategoryForm;
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    categoryId: Category['id'];
};

export default function EditCategoryModal({
    data,
    isEdit,
    setIsEdit,
    categoryId,
}: EditCategoryModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryForm>({
        defaultValues: {
            category_name: data.category_name,
            category_description: data.category_description,
        },
    });
    
    const { update, isPending } = useEditCategory();

    const handleEditCategory = (formData: CategoryForm) => {
        const data = {
            categoryId,
            formData,
        };
        update(data, {
            onSuccess: () => {
                setIsEdit(false);
                reset();
            },
        });
    };

    return (
        <ResponsiveDialog
            title='Editar categoría'
            isOpen={isEdit}
            setIsOpen={setIsEdit}
            description='Aquí puedes editar los datos de la categoría.'>
            <form onSubmit={handleSubmit(handleEditCategory)} noValidate>
                <Categoryform register={register} errors={errors} />
                <div className='flex items-center justify-end'>
                    <Button variant={'principal'}>
                        {isPending ? (
                            <div className='flex items-center justify-center'>
                                <SpinnerMini />
                            </div>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <BiSave /> Guardar
                            </div>
                        )}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    );
}
