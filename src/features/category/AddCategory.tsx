import { CategoryForm } from '@/types/category';
import { useForm } from 'react-hook-form';
import { useAddCategory } from './useAddCategory';
import Categoryform from './Categoryform';
import ResponsiveDialog from '@/components/ResponsiveDialog';
import { Button } from '@/components/ui/button';
import SpinnerMini from '@/components/SpinnerMini';
import { BiSave } from 'react-icons/bi';

type AddCategoryProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddCategory({ isOpen, setIsOpen }: AddCategoryProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryForm>();
    const { AddCategory, isPending } = useAddCategory();
    const onSubmit = (data: CategoryForm) => {
        AddCategory(data, {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };
    return (
        <ResponsiveDialog
            title='Agregar categoria'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            description='Agrega un plato al menú de tu restaurante'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Categoryform register={register} errors={errors} />
                <div className='flex items-center justify-end'>
                    <Button variant={'ghost'} onClick={() => setIsOpen(false)}>
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
