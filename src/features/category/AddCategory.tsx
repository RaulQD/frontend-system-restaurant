import { CategoryForm } from '@/types/category';
import { useForm } from 'react-hook-form';
import { useAddCategory } from './useAddCategory';
import Categoryform from './Categoryform';
import ResponsiveDialog from '@/components/ResponsiveDialog';
import { Button } from '@/components/ui/button';
import SpinnerMini from '@/components/SpinnerMini';
import { BiSave } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type AddCategoryProps = {
    open: boolean;
};

export default function AddCategory({ open }: AddCategoryProps) {
    const navigate = useNavigate();
    const initialValues: CategoryForm = {
        category_name: '',
        category_description: '',
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });
    const { AddCategory, isPending } = useAddCategory();
    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const onSubmit = (data: CategoryForm) => {
        AddCategory(data, {
            onSuccess: () => {
                reset();
                navigate(location.pathname, { replace: true });
            },
        });
    };
    return (
        <ResponsiveDialog
            title='Agregar categoria'
            open={open}
            description='Agrega un plato al menú de tu restaurante'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Categoryform register={register} errors={errors} />
                <div className='flex items-center justify-end gap-2'>
                    <Button
                        type='button'
                        variant={'ghost'}
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
                                <BiSave /> Guardar
                            </div>
                        )}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    );
}
