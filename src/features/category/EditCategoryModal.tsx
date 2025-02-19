import ResponsiveDialog from '@/components/ResponsiveDialog';
import { Category, CategoryForm } from '@/types/category';
import { useForm } from 'react-hook-form';
import Categoryform from './Categoryform';
import { Button } from '@/components/ui/button';
import SpinnerMini from '@/components/SpinnerMini';
import { useEditCategory } from './useEditCategory';
import { useNavigate } from 'react-router-dom';

type EditCategoryModalProps = {
    data: CategoryForm;
    open: boolean;
    categoryId: Category['id'];
};

export default function EditCategoryModal({
    data,
    open,
    categoryId,
}: EditCategoryModalProps) {
    const navigate = useNavigate();
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
        const categoryData = {
            formData,
            categoryId,
        };
        update(categoryData, {
            onSuccess: () => {
                reset();
                navigate(location.pathname, { replace: true });
            },
        });
    };

    return (
        <ResponsiveDialog
            title='Editar categoría'
            open={open}
            description='Aquí puedes editar los datos de la categoría.'>
            <form onSubmit={handleSubmit(handleEditCategory)} noValidate>
                <Categoryform register={register} errors={errors} />
                <div className='flex items-center justify-end gap-2'>
                    <Button
                        type='button'
                        variant={'secondary'}
                        onClick={() => {
                            reset();
                            navigate(location.pathname, { replace: true });
                        }}>
                        Cancelar
                    </Button>
                    <Button variant={'principal'}>
                        {isPending ? (
                            <div className='flex items-center justify-center'>
                                <SpinnerMini />
                            </div>
                        ) : (
                            <div className='flex items-center gap-2'>
                                Guardar
                            </div>
                        )}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    );
}
